import { Container } from "inversify";
import { MessageSocketHandler } from "../core/socket-handler/impl/message-socket-handler";
import { SocketHandler } from "../core/socket-handler/socket-handler";
import { MessageSocketServer } from "../message-socket-server";
import { MessageHandlerService } from "../services/message-handler-service";
import { MessagePersistenceService } from "../services/message-persistence-service";
import { MessageValidationService } from "../services/message-validation-service";
import { RamDb } from "../services/plain-db/impl/ram-db";
import { PlainDb } from "../services/plain-db/plain-db";
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

container.bind<MessagePersistenceService>(TYPES.MessagePersistenceService)
  .to(MessagePersistenceService);

container.bind<MessageValidationService>(TYPES.MessageValidationService)
  .to(MessageValidationService);

export { container };
