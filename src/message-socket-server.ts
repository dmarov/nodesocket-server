import { Server, Socket } from "socket.io";
import http, { Server as HttpServer } from "http";
import { inject, injectable } from "inversify";
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

  constructor(
    @inject(TYPES.MessagePersistenceInterface) private readonly messagePersistence: MessagePersistenceInterface,
    @inject(TYPES.ServerPort) private readonly serverPort: number,
    @inject(TYPES.ServerAddress) private readonly serverAddress: string,
    @inject(TYPES.AllowedOrigins) private readonly origins: string,
  ) {
    this.server = http.createServer();

    const origin = this.origins
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
        this.server.listen(this.serverPort, this.serverAddress, () => {
          console.info(`listening on ${this.serverAddress}:${this.serverPort}`);
        });
      }, (e) => {
        throw e;
      });
  }
}
