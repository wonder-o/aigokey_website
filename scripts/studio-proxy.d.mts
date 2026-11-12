import type { IncomingMessage, ServerResponse } from "node:http";
export const STUDIO_UPSTREAM: string;
export function studioProxy(
  req: IncomingMessage,
  res: ServerResponse,
  next?: () => void,
): Promise<void>;
