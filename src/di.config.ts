import { Container } from "inversify";
import { IRamDb, RamDb } from "./core/db/ram-db";
import { ISocketHandler, SocketHandler } from "./core/socket-handler";
import { TYPES } from "./types";

const instance = new Container();

instance.bind<ISocketHandler>(TYPES.ISocketHandler).to(SocketHandler);
instance.bind<IRamDb>(TYPES.IRamDb).to(RamDb);

export const container = instance;
