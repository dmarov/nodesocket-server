import { Container } from "inversify";
import { MessageSocketHandler } from "../handlers/socket-handler/impl/message-socket-handler";
import { SocketHandler } from "../handlers/socket-handler/socket-handler";
import { MessageSocketServer } from "../message-socket-server";
import { MessageHandlerService } from "../services/message-handler/impl/message-handler";
import { MessageHandlerInterface } from "../services/message-handler/message-handler";
import { MessagePersistenceService } from "../services/message-persistence/impl/message-persistence";
import { MessagePersistenceInterface } from "../services/message-persistence/message-persistence";
import { MessageValidationService } from "../services/message-validation/impl/message-validation";
import { MessageValidationInterface } from "../services/message-validation/message-validation";
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

container.bind<MessageHandlerInterface>(TYPES.MessageHandlerInterface)
  .to(MessageHandlerService);

container.bind<MessagePersistenceInterface>(TYPES.MessagePersistenceInterface)
  .to(MessagePersistenceService);

container.bind<MessageValidationInterface>(TYPES.MessageValidationInterface)
  .to(MessageValidationService);

export { container };
