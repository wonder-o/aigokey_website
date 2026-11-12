import type { MediaKind, Protocol } from "./studio-api";
export interface StudioRecord {
  id: string;
  kind: MediaKind;
  model: string;
  protocol: Protocol;
  prompt: string;
  createdAt: number;
  state: "submitting" | "processing" | "completed" | "failed" | "uncertain";
  fingerprint: string;
  taskId?: string;
  error?: string;
  media: { url: string; blob?: Blob }[];
  settings: {
    size: string;
    quality: string;
    count: number;
    resolution: string;
    duration: number;
    ratio: string;
  };
}
let database: Promise<IDBDatabase> | undefined;
function openDatabase() {
  return (database ||= new Promise((resolve, reject) => {
    const request = indexedDB.open("aigokey-studio", 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore("works", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      database = undefined;
      reject(request.error);
    };
  }));
}
async function transaction<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>,
) {
  const db = await openDatabase();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction("works", mode);
    const request = action(tx.objectStore("works"));
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}
export const readHistory = () =>
  transaction("readonly", (store) => store.getAll()) as Promise<StudioRecord[]>;
export const saveRecord = (record: StudioRecord) =>
  transaction("readwrite", (store) => store.put(record));
export const clearHistory = () =>
  transaction("readwrite", (store) => store.clear());
