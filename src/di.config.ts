import { Container } from "inversify";
import { RamDb } from "./core/plain-db/impl/ram-db";
import { PlainDb } from "./core/plain-db/plain-db";
import { MessageSocketHandler } from "./core/socket-handler/impl/message-socket-handler";
import { SocketHandler } from "./core/socket-handler/socket-handler";
import { TYPES } from "./types";

const instance = new Container();

instance.bind<SocketHandler>(TYPES.SocketHandler).to(MessageSocketHandler);
instance.bind<PlainDb>(TYPES.PlainDb).to(RamDb);

export const container = instance;
