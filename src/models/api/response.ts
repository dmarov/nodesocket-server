import { ServerMessageTypes } from "./server-message-types";

export type Response = { type: ServerMessageTypes, payload: string };
