import { Container, interfaces } from "inversify";
import { Socket } from "socket.io";
import {
  SocketHandler,
  MessageSocketHandler,
} from "@/handlers/socket-handler";
import { MessageSocketServer } from "@/message-socket-server";
import {
  MessageHandlerService,
  MessageHandlerInterface,
} from "@/services/message-handler";
import {
  MessagePersistenceService,
  MessagePersistenceInterface,
} from "@/services/message-persistence";
import {
  MessageValidationService,
  MessageValidationInterface,
} from "@/services/message-validation";
import { PlainDb, RamDb } from "@/services/plain-db";
import {
  SettingsService,
  SettingsInterface,
} from "@/services/settings";
import { SocketServer } from "@/socket-server";
import { TYPES } from "./types";

const container = new Container();

container.bind<SocketServer>(TYPES.SocketServer)
  .to(MessageSocketServer);

container.bind<interfaces.Factory<SocketHandler>>(TYPES.SocketHandler)
  .toFactory<SocketHandler, [Socket]>((context: interfaces.Context) => {
    return (socket: Socket) => {
      const handlerService = context.container.get<MessageHandlerInterface>(TYPES.MessageHandlerInterface);
      console.log(handlerService);
      const settingsService = context.container.get<SettingsInterface>(TYPES.SettingsInterface);
      return new MessageSocketHandler(socket, handlerService, settingsService);
    };
  });

container.bind<PlainDb>(TYPES.PlainDb)
  .to(RamDb)
  .inSingletonScope();

container.bind<MessageHandlerInterface>(TYPES.MessageHandlerInterface)
  .to(MessageHandlerService)
  .inSingletonScope();

container.bind<MessagePersistenceInterface>(TYPES.MessagePersistenceInterface)
  .to(MessagePersistenceService)
  .inSingletonScope();

container.bind<MessageValidationInterface>(TYPES.MessageValidationInterface)
  .to(MessageValidationService)
  .inSingletonScope();

container.bind<SettingsInterface>(TYPES.SettingsInterface)
  .to(SettingsService)
  .inSingletonScope();

export { container };
