import { Container } from "inversify";
import { RamDb } from "../core/plain-db/impl/ram-db";
import { PlainDb } from "../core/plain-db/plain-db";
import { MessageHandlerService } from "../core/services/message-handler-service";
import { MessageSocketHandler } from "../core/socket-handler/impl/message-socket-handler";
import { SocketHandler } from "../core/socket-handler/socket-handler";
import { MessageSocketServer } from "../message-socket-server";
import { SocketServer } from "../socket-server";
import { TYPES } from "./types";

const container = new Container();

container.bind<SocketServer>(TYPES.SocketServer)
  .to(MessageSocketServer);

container.bind<SocketHandler>(TYPES.SocketHandler)
  .to(MessageSocketHandler);

container.bind<PlainDb>(TYPES.PlainDb)
  .to(RamDb)
  .inSingletonScope();

container.bind<MessageHandlerService>(TYPES.MessageHandlerService)
  .to(MessageHandlerService);

export { container };
