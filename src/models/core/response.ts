import { ServerMessageTypes } from "../../core/shared-models/server-message-types";

export type Response = { type: ServerMessageTypes, payload: string };
