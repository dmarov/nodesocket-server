import { Server, Socket } from "socket.io";
import http, { Server as HttpServer } from "http";
import { inject, injectable } from "inversify";
import { args } from "@/utils";
import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { SocketServer } from "@/socket-server";
import { SocketHandler } from "@/handlers";
import { MessagePersistenceInterface } from "@/services";

@injectable()
export class MessageSocketServer implements SocketServer {
  private readonly server: HttpServer;
  private readonly io: Server;

  private readonly onConnection = (socket: Socket): void => {
    const factory = container.get<(socket: Socket) => SocketHandler>(TYPES.SocketHandlerFactory);
    factory(socket);
  };

  @inject(TYPES.MessagePersistenceInterface)
  private readonly messagePersistence!: MessagePersistenceInterface;

  constructor() {
    this.server = http.createServer();

    const origin = (args.allowedClients as string)
      .split(" ")
      .filter(o => !!o);

    this.io = new Server(this.server, {
      cors: {
        origin
      },
    });

    this.io.on("connection", this.onConnection);
  }

  listen(): void {
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
