import { Server, Socket } from "socket.io";
import http, { Server as HttpServer } from "http";
import { args } from "@/utils/args";
import { container } from "@/di/config";
import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";
import { SocketServer } from "@/socket-server";
import { SocketHandler } from "@/handlers/socket-handler/socket-handler";
import { MessagePersistenceInterface } from "@/services/message-persistence/message-persistence";

@injectable()
export class MessageSocketServer implements SocketServer {
  private readonly server: HttpServer;
  private readonly io: Server;

  private readonly onConnection = (socket: Socket) => {
    const factory = container.get<(socket: Socket) => SocketHandler>(TYPES.SocketHandler);
    factory(socket);
  };

  @inject(TYPES.MessagePersistenceInterface)
  private readonly messagePersistence: MessagePersistenceInterface;

  constructor() {
    this.server = http.createServer();

    this.io = new Server(this.server, {
      cors: {
        origin: args.allowedClients as string[],
      },
    });

    this.io.on("connection", this.onConnection);
  }

  listen() {
    this.messagePersistence.initMessages()
      .unwrap(() => {
        this.server.listen(args.port, "0.0.0.0", () => {
          console.info(`listening on ${args.port}`);
        });
      }, (e) => {
        throw e;
      });
  }
}
