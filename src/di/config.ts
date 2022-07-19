import { Container, interfaces } from "inversify";
import { Socket } from "socket.io";
import { MessageSocketHandler } from "@/handlers/socket-handler/impl/message-socket-handler";
import { SocketHandler } from "@/handlers/socket-handler/socket-handler";
import { MessageSocketServer } from "@/message-socket-server";
import { MessageHandlerService } from "@/services/message-handler/impl/message-handler";
import { MessageHandlerInterface } from "@/services/message-handler/message-handler";
import { MessagePersistenceService } from "@/services/message-persistence/impl/message-persistence";
import { MessagePersistenceInterface } from "@/services/message-persistence/message-persistence";
import { MessageValidationService } from "@/services/message-validation/impl/message-validation";
import { MessageValidationInterface } from "@/services/message-validation/message-validation";
import { RamDb } from "@/services/plain-db/impl/ram-db";
import { PlainDb } from "@/services/plain-db/plain-db";
import { SettingsService } from "@/services/settings/impl/settings";
import { SettingsInterface } from "@/services/settings/settings";
import { SocketServer } from "@/socket-server";
import { TYPES } from "./types";

const container = new Container();

container.bind<SocketServer>(TYPES.SocketServer)
  .to(MessageSocketServer);

container.bind<(socket: Socket) => SocketHandler>(TYPES.SocketHandler)
  .toFactory<SocketHandler>((context: interfaces.Context) => {
    return (socket: Socket) => {
      const handlerService = context.container.get<MessageHandlerInterface>(TYPES.MessageHandlerInterface);
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
