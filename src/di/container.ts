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
import {
  UserIdentityPersistenceInterface,
  UserIdentityPersistenceService,
} from "@/services/user-identity-persistence";
import { args } from "@/utils";
import { UserIdentityHandlerInterface, UserIdentityHandlerService, UserIdentityValidationInterface, UserIdentityValidationService } from "@/services";

const container = new Container();

container.bind<SocketServer>(TYPES.SocketServer)
  .to(MessageSocketServer);

container.bind<interfaces.Factory<SocketHandler>>(TYPES.SocketHandlerFactory)
  .toFactory<SocketHandler, [Socket]>((context: interfaces.Context) => {
    return (socket: Socket) => {
      const handlerService = context.container.get<MessageHandlerInterface>(TYPES.MessageHandlerInterface);
      const settingsService = context.container.get<SettingsInterface>(TYPES.SettingsInterface);
      return new MessageSocketHandler(socket, handlerService, settingsService);
    };
  });

container.bind<PlainDb>(TYPES.PlainDb)
  .to(RamDb)
  .inSingletonScope();

container.bind<MessageValidationInterface>(TYPES.MessageValidationInterface)
  .to(MessageValidationService)
  .inSingletonScope();

container.bind<MessageHandlerInterface>(TYPES.MessageHandlerInterface)
  .to(MessageHandlerService)
  .inSingletonScope();

container.bind<MessagePersistenceInterface>(TYPES.MessagePersistenceInterface)
  .to(MessagePersistenceService)
  .inSingletonScope();

container.bind<SettingsInterface>(TYPES.SettingsInterface)
  .to(SettingsService)
  .inSingletonScope();

container.bind<UserIdentityPersistenceInterface>(TYPES.UserIdentityPersistenceInterface)
  .to(UserIdentityPersistenceService)
  .inSingletonScope();

container.bind<UserIdentityValidationInterface>(TYPES.UserIdentityValidationInterface)
  .toConstantValue(new UserIdentityValidationService(3, 20));

container.bind<UserIdentityHandlerInterface>(TYPES.UserIdentityHandlerInterface)
  .to(UserIdentityHandlerService)
  .inSingletonScope();

container.bind<number>(TYPES.UsersLimit)
  .toConstantValue(args.usersLimit);

container.bind<number>(TYPES.MessageMinLength)
  .toConstantValue(args.msgMinLength);

container.bind<number>(TYPES.MessageMaxLength)
  .toConstantValue(args.msgMaxLength);

container.bind<number>(TYPES.ServerPort)
  .toConstantValue(args.port);

container.bind<string>(TYPES.AllowedOrigins)
  .toConstantValue(args.allowedClients as string);

container.bind<string>(TYPES.ServerAddress)
  .toConstantValue(args.address);

export { container };
