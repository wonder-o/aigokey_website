import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRaw,
  watch,
} from "vue";
import {
  API_BASE,
  CONSOLE_ORIGIN,
  ApiError,
  cacheMedia,
  keyFingerprint,
  loadModelCatalog,
  mediaUrls,
  pollTask,
  submitGeneration,
  taskId,
  taskState,
  videoContent,
  type MediaKind,
  type StudioModel,
} from "@/lib/studio-api";
import {
  clearHistory,
  readHistory,
  saveRecord,
  type StudioRecord,
} from "@/lib/studio-history";

const examples = [
  {
    label: "橘猫宇航员",
    image:
      "一只橘猫宇航员漂浮在月球上方，头盔映出蓝色地球，细腻的毛发，电影级光影，充满想象力的写实摄影。",
    video:
      "一只橘猫宇航员在月球表面轻轻跃起，慢动作漂浮，镜头缓缓推近头盔里映出的蓝色地球，电影级光影。",
  },
  {
    label: "赛博朋克街头",
    image:
      "雨后的赛博朋克街头，霓虹灯倒映在湿润的路面，远处行人的剪影，蓝紫色调，35mm 胶片质感。",
    video:
      "镜头缓慢穿过雨后的赛博朋克街头，霓虹灯在水洼中闪烁，路人撑伞走过，蓝紫色电影色调，平稳的跟拍。",
  },
  {
    label: "产品摄影",
    image:
      "一瓶透明香水置于浅色石台上，柔和的晨光穿过瓶身，水面倒影，极简构图，高端产品摄影。",
    video:
      "一瓶透明香水置于浅色石台上，镜头缓慢环绕瓶身，晨光随角度折射，水面涟漪轻轻荡开，高端产品广告。",
  },
  {
    label: "未来城市",
    image:
      "云层之上的未来城市，悬浮花园与玻璃建筑相连，落日金色光线，广角建筑摄影，细节丰富。",
    video:
      "航拍镜头穿越云层，缓缓揭示悬浮花园与玻璃建筑相连的未来城市，飞行器从远处经过，金色日落，壮阔电影镜头。",
  },
  {
    label: "海浪慢镜头",
    image:
      "晶莹剔透的海浪在日落时卷起，阳光穿透水体，飞溅的水珠，静谧海岸，超清自然摄影。",
    video:
      "日落时分的海浪以慢动作卷起，阳光穿透晶莹的水体，浪花飞溅后轻轻落回海面，固定低机位，宁静自然。",
  },
];
const defaults = () => ({
  model: "",
  prompt: "",
  size: "1024x1024",
  quality: "auto",
  count: 1,
  resolution: "720p",
  duration: 6,
  ratio: "16:9",
  stream: false,
  cameraMotion: "",
  outputFormat: "png",
  frameCount: 8,
  frameDurationMs: 100,
  geminiOutput: "image" as "image" | "url",
  audioReference: undefined as File | undefined,
  sourceVideoUrl: "",
  reference: undefined as File | undefined,
  referenceUrl: "",
});
const savedKeyName = (kind: MediaKind) => `aigokey-studio-key-${kind}`;

export function useStudio() {
  const mode = ref<MediaKind>("image");
  const forms = reactive({ image: defaults(), video: defaults() });
  const sessions = reactive({
    image: {
      key: "",
      fingerprint: "",
      models: [] as StudioModel[],
      unsupportedIds: [] as string[],
      total: 0,
    },
    video: {
      key: "",
      fingerprint: "",
      models: [] as StudioModel[],
      unsupportedIds: [] as string[],
      total: 0,
    },
  });
  const form = computed(() => forms[mode.value]);
  const session = computed(() => sessions[mode.value]);
  const models = computed(() =>
    session.value.models.filter((model) => model.kind === mode.value),
  );
  const unsupportedIds = computed(() => session.value.unsupportedIds);
  const modelCatalogTotal = computed(() => session.value.total);
  const model = computed(() =>
    models.value.find((item) => item.id === form.value.model),
  );
  const connected = computed(() => !!session.value.key);
  const isGpt = computed(() => model.value?.protocol === "image");
  const isGemini = computed(() => model.value?.protocol === "gemini");
  const isMuse = computed(() => model.value?.protocol === "muse-video");
  const isGrokImage = computed(() => model.value?.protocol === "grok-image");
  const supportsReference = computed(() => {
    if (!connected.value || mode.value === "image") return true;
    if (
      model.value?.protocol === "seedance" ||
      model.value?.protocol === "muse-video"
    )
      return true;
    if (model.value?.protocol === "grok-video")
      return /video[-_.]1[._]5(?:$|[-_.])/i.test(model.value.id);
    return false;
  });
  const durationOptions = computed(() => {
    if (mode.value !== "video" || !model.value) return [5, 6, 10, 15];
    const leaf = model.value.id.split(/[/:]/).at(-1) || model.value.id;
    if (model.value.protocol === "seedance")
      return Array.from({ length: 12 }, (_, index) => index + 4);
    if (model.value.protocol === "muse-video") {
      const longModel = leaf.match(/-(20|30|40|50|60)s$/i);
      return longModel
        ? [Number(longModel[1])]
        : Array.from({ length: 10 }, (_, index) => index + 1);
    }
    return Array.from({ length: 15 }, (_, index) => index + 1);
  });
  const resolutionOptions = computed(() => {
    if (mode.value !== "video" || !connected.value || !model.value)
      return ["480p", "720p"];
    if (model.value.protocol === "grok-video")
      return ["480p", "720p", "1080p"];
    if (model.value.protocol === "seedance") return ["720p"];
    return [];
  });
  const ratioOptions = computed(() => {
    if (mode.value === "image")
      return isGemini.value ? ["1:1", "16:9", "9:16", "3:2", "2:3"] : [];
    if (!model.value) return ["16:9", "9:16", "1:1"];
    if (model.value.protocol === "grok-video")
      return ["16:9", "9:16", "1:1", "4:3", "3:4", "2:3", "3:2"];
    if (model.value.protocol === "seedance")
      return model.value.id.toLowerCase().includes("canopus")
        ? ["16:9", "9:16", "1:1", "4:3", "3:4"]
        : ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"];
    if (model.value.protocol === "muse-video")
      return ["16:9", "9:16", "1:1", "4:3", "3:4"];
    return ["16:9", "9:16", "1:1"];
  });
  const keyDialog = ref<HTMLDialogElement>();
  const clearDialog = ref<HTMLDialogElement>();
  const keyMode = ref<MediaKind>("image");
  const keyDrafts = reactive({
    image: { input: "", show: false, remember: false, error: "" },
    video: { input: "", show: false, remember: false, error: "" },
  });
  const keyInput = computed({
    get: () => keyDrafts[keyMode.value].input,
    set: (value: string) => {
      keyDrafts[keyMode.value].input = value;
    },
  });
  const showKey = computed({
    get: () => keyDrafts[keyMode.value].show,
    set: (value: boolean) => {
      keyDrafts[keyMode.value].show = value;
    },
  });
  const rememberKey = computed({
    get: () => keyDrafts[keyMode.value].remember,
    set: (value: boolean) => {
      keyDrafts[keyMode.value].remember = value;
    },
  });
  const connectionError = computed(() => keyDrafts[keyMode.value].error);
  const keyConnected = computed(() => !!sessions[keyMode.value].key);
  const connecting = ref(false);
  const error = ref(""),
    notice = ref(""),
    storageWarning = ref(""),
    preview = ref("");
  const history = ref<StudioRecord[]>([]);
  const selectedIds = reactive({ image: "", video: "" });
  const selected = computed(() =>
    history.value.find((item) => item.id === selectedIds[mode.value]),
  );
  const historyFilter = ref<"all" | MediaKind>("all");
  const filteredHistory = computed(() =>
    history.value.filter(
      (item) =>
        historyFilter.value === "all" || item.kind === historyFilter.value,
    ),
  );
  const submitting = ref<MediaKind | null>(null);
  const polls = new Map<string, AbortController>();
  const polling = reactive(new Set<string>());
  const hydrating = reactive(new Set<string>());
  const playbackErrors = reactive(new Map<string, string>());
  const objectUrls = new Map<Blob, string>();
  let submitController: AbortController | undefined;
  let connectController: AbortController | undefined;
  let disposed = false;

  function mediaSource(item: StudioRecord["media"][number]) {
    if (!item.blob) return item.url;
    const blob = toRaw(item.blob);
    if (!objectUrls.has(blob)) objectUrls.set(blob, URL.createObjectURL(blob));
    return objectUrls.get(blob)!;
  }
  function isPdf(item: StudioRecord["media"][number]) {
    return item.blob?.type === "application/pdf" || /\.pdf(?:$|[?#])/i.test(item.url);
  }
  async function persist(record: StudioRecord) {
    try {
      await saveRecord(structuredClone(toRaw(record)));
    } catch {
      storageWarning.value =
        "本地存储不可用或空间不足，请及时下载作品。当前页面仍可继续使用。";
    }
  }
  async function openKeyDialog() {
    keyMode.value = mode.value;
    for (const kind of ["image", "video"] as const) {
      Object.assign(keyDrafts[kind], {
        input: "",
        show: false,
        remember: false,
        error: "",
      });
    }
    await nextTick();
    keyDialog.value?.showModal();
  }
  async function selectKeyTab(kind: MediaKind, focus = false) {
    if (connecting.value) return;
    keyMode.value = kind;
    if (focus) {
      await nextTick();
      keyDialog.value
        ?.querySelector<HTMLButtonElement>(`#${kind}-key-tab`)
        ?.focus();
    }
  }
  function closeKeyDialog() {
    if (!connecting.value) keyDialog.value?.close();
  }
  async function connectKey(
    key: string,
    kind: MediaKind,
    remember: boolean,
    signal?: AbortSignal,
  ) {
    const [catalog, fingerprint] = await Promise.all([
      loadModelCatalog(key, signal),
      keyFingerprint(key),
    ]);
    if (disposed || signal?.aborted) return;
    sessions[kind] = {
      key,
      models: catalog.models,
      fingerprint,
      unsupportedIds: catalog.unsupportedIds,
      total: catalog.total,
    };
    if (
      !catalog.models.some(
        (item) => item.id === forms[kind].model && item.kind === kind,
      )
    )
      forms[kind].model =
        catalog.models.find((item) => item.kind === kind)?.id || "";
    try {
      if (remember) localStorage.setItem(savedKeyName(kind), key);
      else localStorage.removeItem(savedKeyName(kind));
    } catch {
      storageWarning.value = "浏览器禁止保存密钥，本次连接仍可使用。";
    }
    for (const record of history.value) {
      if (record.kind !== kind || record.fingerprint !== fingerprint) continue;
      if (record.taskId && ["processing", "uncertain"].includes(record.state)) {
        void resume(record);
      } else if (record.state === "completed" && record.kind === "video") {
        record.media.forEach((item, index) => {
          if (!item.blob) void ensureVideoPlayable(record, index);
        });
      }
    }
  }
  async function connect() {
    if (connecting.value) return;
    const kind = keyMode.value;
    const draft = keyDrafts[kind];
    const key = draft.input.trim();
    if (!key || /\s/.test(key)) {
      draft.error = "请输入完整的 API Key，不要包含空格。";
      return;
    }
    connecting.value = true;
    draft.error = "";
    connectController = new AbortController();
    try {
      await connectKey(key, kind, draft.remember, connectController.signal);
      if (!connectController.signal.aborted && !disposed) mode.value = kind;
      draft.input = "";
      draft.show = false;
    } catch (cause) {
      if (!disposed)
        draft.error =
          cause instanceof Error ? cause.message : "连接失败，请重试。";
    } finally {
      connecting.value = false;
    }
  }
  function disconnect() {
    const kind = keyMode.value;
    for (const record of history.value)
      if (record.kind === kind) polls.get(record.id)?.abort();
    sessions[kind] = {
      key: "",
      fingerprint: "",
      models: [],
      unsupportedIds: [],
      total: 0,
    };
    forms[kind].model = "";
    try {
      localStorage.removeItem(savedKeyName(kind));
    } catch {
      /* optional storage */
    }
    Object.assign(keyDrafts[kind], {
      input: "",
      show: false,
      remember: false,
      error: "",
    });
  }
  function setExample(example: (typeof examples)[number]) {
    form.value.prompt = example[mode.value];
    error.value = "";
  }
  function removeReference() {
    if (form.value.referenceUrl) URL.revokeObjectURL(form.value.referenceUrl);
    form.value.reference = undefined;
    form.value.referenceUrl = "";
  }
  function setReference(file?: File) {
    if (!file) return;
    error.value = "";
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      error.value = "请选择 PNG、JPG 或 WebP 图片。";
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      error.value = "参考图不能超过 20 MB。";
      return;
    }
    removeReference();
    form.value.reference = file;
    form.value.referenceUrl = URL.createObjectURL(file);
  }
  function setAudioReference(file?: File) {
    if (!file) return;
    error.value = "";
    if (!file.type.startsWith("audio/")) {
      error.value = "请选择音频文件。";
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      error.value = "参考音频不能超过 50 MB。";
      return;
    }
    form.value.audioReference = file;
  }
  function pickAudioFile(event: Event) {
    const input = event.target as HTMLInputElement;
    setAudioReference(input.files?.[0]);
    input.value = "";
  }
  function pickFile(event: Event) {
    const input = event.target as HTMLInputElement;
    setReference(input.files?.[0]);
    input.value = "";
  }
  function dropFile(event: DragEvent) {
    if (!submitting.value) setReference(event.dataTransfer?.files[0]);
  }

  async function finish(record: StudioRecord, urls: string[], key: string) {
    record.state = "completed";
    record.error = undefined;
    record.media = urls.map((url) => ({ url }));
    // Persist the result before downloading; a closed tab must not lose an accepted task.
    await persist(record);
    const blobs = await Promise.all(
      urls.map(async (url) => {
        const blob = await cacheMedia(url);
        return (
          blob ||
          (record.protocol === "grok-video" && record.taskId
            ? await videoContent(record.taskId, key)
            : undefined)
        );
      }),
    );
    record.media = urls.map((url, index) => ({
      url,
      ...(blobs[index] ? { blob: blobs[index] } : {}),
    }));
    await persist(record);
  }
  function mediaKey(record: StudioRecord, index: number) {
    return `${record.id}:${index}`;
  }
  async function ensureVideoPlayable(record: StudioRecord, index: number) {
    const item = record.media[index];
    if (!item || item.blob) return;
    const cacheKey = mediaKey(record, index);
    if (hydrating.has(cacheKey)) return;
    const credential = sessions[record.kind];
    if (credential.fingerprint !== record.fingerprint) {
      playbackErrors.set(
        cacheKey,
        "连接生成此视频时使用的 Key 后，才能在页面内播放。",
      );
      return;
    }
    hydrating.add(cacheKey);
    playbackErrors.delete(cacheKey);
    try {
      const blob =
        ["grok-video", "seedance", "muse-video"].includes(record.protocol) &&
        record.taskId
          ? await videoContent(record.taskId, credential.key)
          : await cacheMedia(item.url);
      if (!blob)
        throw new Error("读取视频失败，请检查 Key 或从原链接打开视频。");
      item.blob = blob;
      await persist(record);
    } catch (cause) {
      playbackErrors.set(
        cacheKey,
        cause instanceof Error ? cause.message : "读取视频失败，请稍后重试。",
      );
    } finally {
      hydrating.delete(cacheKey);
    }
  }
  function wait(ms: number, signal: AbortSignal) {
    return new Promise<void>((resolve) => {
      if (signal.aborted) return resolve();
      const done = () => {
        clearTimeout(timer);
        signal.removeEventListener("abort", done);
        resolve();
      };
      const timer = window.setTimeout(done, ms);
      signal.addEventListener("abort", done, { once: true });
    });
  }
  async function resume(record: StudioRecord) {
    const credential = sessions[record.kind];
    if (!record.taskId || polls.has(record.id)) return;
    if (credential.fingerprint !== record.fingerprint) {
      error.value = "请先连接提交此任务时使用的 API Key，再继续查询。";
      return;
    }
    const controller = new AbortController();
    polls.set(record.id, controller);
    polling.add(record.id);
    record.state = "processing";
    record.error = undefined;
    const deadline = Date.now() + 30 * 60 * 1000;
    let transientErrors = 0;
    try {
      while (!controller.signal.aborted && Date.now() < deadline) {
        let body;
        try {
          body = await pollTask(
            record.taskId,
            record.protocol,
            credential.key,
            controller.signal,
          );
          transientErrors = 0;
        } catch (cause) {
          if (controller.signal.aborted) break;
          if (
            cause instanceof ApiError &&
            (cause.status === 0 ||
              cause.status >= 500 ||
              cause.status === 429) &&
            ++transientErrors <= 3
          ) {
            await wait(5000, controller.signal);
            continue;
          }
          throw cause;
        }
        let done: boolean;
        try {
          done = taskState(body);
        } catch (cause) {
          record.state = "failed";
          throw cause;
        }
        const urls = mediaUrls(body, record.kind, record.settings.outputFormat);
        if (urls.length) {
          await finish(record, urls, credential.key);
          return;
        }
        if (
          done &&
          ["grok-video", "seedance", "muse-video"].includes(record.protocol)
        ) {
          const blob = await videoContent(record.taskId, credential.key);
          if (blob) {
            record.state = "completed";
            record.media = [
              {
                url: `${API_BASE}/videos/${encodeURIComponent(record.taskId)}/content`,
                blob,
              },
            ];
            await persist(record);
            return;
          }
        }
        if (done)
          throw new Error(
            "任务已完成，但未返回可用媒体地址。请在控制台检查任务结果。",
          );
        await wait(4000, controller.signal);
      }
      record.error = controller.signal.aborted
        ? "已暂停查询，服务端任务仍会继续。"
        : "已等待 30 分钟，可稍后继续查询原任务。";
    } catch (cause) {
      if (!controller.signal.aborted)
        record.error =
          cause instanceof Error
            ? cause.message
            : "查询暂时失败，可继续查询原任务。";
    } finally {
      polls.delete(record.id);
      polling.delete(record.id);
      await persist(record);
    }
  }
  function pause(record: StudioRecord) {
    polls.get(record.id)?.abort();
  }

  async function generate() {
    if (submitting.value) return;
    if (!connected.value) {
      await openKeyDialog();
      return;
    }
    if (!model.value) return;
    if (!form.value.prompt.trim()) {
      error.value = "先写一句提示词，或从右侧选择一个灵感。";
      return;
    }
    const kind = mode.value,
      credential = { ...session.value };
    const values = { ...toRaw(form.value) };
    const chosenModel = { ...toRaw(model.value) };
    error.value = "";
    notice.value = "";
    preview.value = "";
    submitting.value = kind;
    const record: StudioRecord = {
      id: crypto.randomUUID(),
      kind,
      model: chosenModel.id,
      protocol: chosenModel.protocol,
      prompt: values.prompt.trim(),
      createdAt: Date.now(),
      state: "submitting",
      fingerprint: credential.fingerprint,
      media: [],
      settings: {
        size: values.size,
        quality: values.quality,
        outputFormat: values.outputFormat,
        frameCount: values.frameCount,
        frameDurationMs: values.frameDurationMs,
        geminiOutput: values.geminiOutput,
        count:
          chosenModel.protocol === "gemini" || values.stream ? 1 : values.count,
        resolution: values.resolution,
        duration: values.duration,
        ratio: values.ratio,
        cameraMotion: values.cameraMotion,
        sourceVideoUrl: values.sourceVideoUrl,
      },
    };
    history.value.unshift(record);
    selectedIds[kind] = record.id;
    // Use the reactive record for visible progress after insertion.
    const live = history.value[0];
    await persist(live);
    submitController = new AbortController();
    try {
      const body = await submitGeneration(
        {
          ...values,
          ...record.settings,
          prompt: record.prompt,
          model: chosenModel,
        },
        credential.key,
        submitController.signal,
        (url) => {
          preview.value = url;
        },
      );
      try {
        taskState(body);
      } catch (cause) {
        live.state = "failed";
        throw cause;
      }
      const urls = mediaUrls(body, kind, values.outputFormat);
      live.taskId = taskId(body, chosenModel.protocol);
      if (urls.length) await finish(live, urls, credential.key);
      else {
        if (!live.taskId)
          throw new Error(
            "未收到作品或任务编号。请在控制台确认请求状态后再操作。",
          );
        live.state = "processing";
        await persist(live);
        void resume(live);
      }
    } catch (cause) {
      if (live.state !== "failed")
        live.state =
          cause instanceof ApiError &&
          cause.status >= 400 &&
          cause.status < 500 &&
          cause.status !== 408
            ? "failed"
            : "uncertain";
      live.error =
        cause instanceof Error ? cause.message : "请求中断，请先确认任务状态。";
      error.value = live.error;
      await persist(live);
    } finally {
      submitting.value = null;
      preview.value = "";
    }
  }

  function selectRecord(record: StudioRecord) {
    mode.value = record.kind;
    selectedIds[record.kind] = record.id;
    error.value = "";
    if (record.kind === "video" && record.state === "completed") {
      record.media.forEach((item, index) => {
        if (!item.blob) void ensureVideoPlayable(record, index);
      });
    }
  }
  function reuse(record: StudioRecord) {
    mode.value = record.kind;
    removeReference();
    Object.assign(forms[record.kind], record.settings, {
      prompt: record.prompt,
      stream: false,
      audioReference: undefined,
    });
    if (sessions[record.kind].models.some((item) => item.id === record.model))
      forms[record.kind].model = record.model;
    notice.value = "提示词和参数已填入，可修改后生成。";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function download(record: StudioRecord, index: number) {
    const item = record.media[index];
    let blob = item.blob || (await cacheMedia(item.url));
    const credential = sessions[record.kind];
    if (
      !blob &&
      ["grok-video", "seedance", "muse-video"].includes(record.protocol) &&
      record.taskId &&
      credential.fingerprint === record.fingerprint
    )
      blob = await videoContent(record.taskId, credential.key);
    if (blob && !item.blob) {
      item.blob = blob;
      playbackErrors.delete(mediaKey(record, index));
      await persist(record);
    }
    if (!blob) {
      error.value =
        "下载未成功，媒体地址可能已过期或限制跨域下载。可尝试“打开原文件”。";
      return;
    }
    const url = URL.createObjectURL(blob);
    const ext = record.kind === "video"
      ? "mp4"
      : blob.type === "application/pdf"
        ? "pdf"
        : blob.type === "image/svg+xml"
          ? "svg"
          : blob.type === "image/gif"
            ? "gif"
            : blob.type.includes("jpeg")
              ? "jpg"
              : blob.type.includes("webp")
                ? "webp"
                : "png";
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `aigokey-${record.id.slice(0, 8)}-${index + 1}.${ext}`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  async function clearWorks() {
    if (submitting.value || polling.size) return;
    try {
      await clearHistory();
      history.value = [];
      selectedIds.image = "";
      selectedIds.video = "";
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.clear();
      clearDialog.value?.close();
    } catch {
      error.value = "清空失败，请检查浏览器存储权限。";
      clearDialog.value?.close();
    }
  }
  const stateLabel = (record: StudioRecord) =>
    ({
      submitting: "正在提交",
      processing: polling.has(record.id) ? "生成中" : "等待查询",
      completed: "已完成",
      failed: "生成失败",
      uncertain: "状态待确认",
    })[record.state];
  const formatDate = (time: number) =>
    new Date(time).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  watch(mode, () => {
    error.value = "";
    notice.value = "";
  });
  watch(
    () => form.value.model,
    (newModel, oldModel) => {
      form.value.stream = false;
      if (isGemini.value) {
        form.value.count = 1;
        if (form.value.size === "auto") form.value.size = "1024x1024";
      }
      if (isGrokImage.value) {
        form.value.count = 1;
        form.value.outputFormat = "png";
      }
      if (isMuse.value) {
        form.value.count = 1;
        form.value.duration = durationOptions.value[0] || 10;
        form.value.cameraMotion = "zoom_in";
      }
      if (
        model.value?.protocol !== "seedance" ||
        !model.value.id.toLowerCase().includes("coke")
      )
        form.value.audioReference = undefined;
      if (model.value?.protocol !== "muse-video")
        form.value.sourceVideoUrl = "";
      if (!supportsReference.value && form.value.reference) removeReference();
      if (newModel && oldModel && model.value) {
        if (!ratioOptions.value.includes(form.value.ratio))
          form.value.ratio = ratioOptions.value[0] || "16:9";
        if (
          resolutionOptions.value.length &&
          !resolutionOptions.value.includes(form.value.resolution)
        )
          form.value.resolution = resolutionOptions.value[0];
        if (!durationOptions.value.includes(form.value.duration))
          form.value.duration = durationOptions.value[0] || 5;
      }
      if (
        model.value?.protocol === "grok-video" &&
        form.value.resolution === "1080p"
      )
        form.value.resolution = "720p";
    },
  );
  watch(
    () => form.value.stream,
    (enabled) => {
      if (enabled) form.value.count = 1;
    },
  );
  watch(
    () => form.value.outputFormat,
    (format) => {
      if (format !== "png") form.value.stream = false;
    },
  );
  onMounted(async () => {
    try {
      history.value = (await readHistory())
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((item) =>
          item.state === "submitting"
            ? {
                ...item,
                state: "uncertain",
                error: "页面曾在提交时关闭。请先到控制台确认此次请求状态。",
              }
            : item,
        );
    } catch {
      storageWarning.value = "本地历史记录暂不可用，请及时下载生成结果。";
    }
    for (const kind of ["image", "video"] as const) {
      try {
        const key = localStorage.getItem(savedKeyName(kind));
        if (key) await connectKey(key, kind, true);
      } catch {
        notice.value = "已保存的 Key 未能连接，请点击右上角重新连接。";
      }
    }
  });
  onBeforeUnmount(() => {
    disposed = true;
    submitController?.abort();
    connectController?.abort();
    polls.forEach((controller) => controller.abort());
    objectUrls.forEach((url) => URL.revokeObjectURL(url));
    for (const kind of ["image", "video"] as const)
      if (forms[kind].referenceUrl)
        URL.revokeObjectURL(forms[kind].referenceUrl);
  });

  return {
    API_BASE,
    CONSOLE_ORIGIN,
    mode,
    form,
    session,
    models,
    unsupportedIds,
    modelCatalogTotal,
    model,
    connected,
    isGpt,
    isGemini,
    isMuse,
    isGrokImage,
    supportsReference,
    durationOptions,
    resolutionOptions,
    ratioOptions,
    examples,
    keyDialog,
    clearDialog,
    keyMode,
    keyConnected,
    keyInput,
    showKey,
    rememberKey,
    connecting,
    connectionError,
    error,
    notice,
    storageWarning,
    preview,
    history,
    selected,
    historyFilter,
    filteredHistory,
    submitting,
    polling,
    hydrating,
    playbackErrors,
    sessions,
    mediaSource,
    isPdf,
    openKeyDialog,
    closeKeyDialog,
    selectKeyTab,
    connect,
    disconnect,
    setExample,
    removeReference,
    pickAudioFile,
    pickFile,
    dropFile,
    generate,
    resume,
    pause,
    selectRecord,
    ensureVideoPlayable,
    mediaKey,
    reuse,
    download,
    clearWorks,
    stateLabel,
    formatDate,
  };
}
