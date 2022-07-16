import { Container } from "inversify";
import { RamDb } from "./core/db/ram-db";
import { SocketHandler } from "./core/socket-handler";

export const TYPES = {
  RamDb: Symbol.for("RamDb"),
  SocketHandler: Symbol.for("SocketHandler"),
};

const container = new Container();
container.bind<RamDb>(TYPES.RamDb).to(RamDb);
container.bind<SocketHandler>(TYPES.SocketHandler).to(SocketHandler);

export { container };
