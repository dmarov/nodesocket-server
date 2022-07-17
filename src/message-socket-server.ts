import { Server, Socket } from "socket.io";
import http, { Server as HttpServer } from "http";
import { args } from "./utils/args";
import { container } from "./di/config";
import { TYPES } from "./di/types";
import { inject, injectable } from "inversify";
import { SocketServer } from "./socket-server";
import { PlainDb } from "./services/plain-db/plain-db";
import { SocketHandler } from "./handlers/socket-handler/socket-handler";

@injectable()
export class MessageSocketServer implements SocketServer {
  private readonly server: HttpServer;
  private readonly io: Server;

  private readonly onConnection = (socket: Socket) => {
    const handler = container.get<SocketHandler>(TYPES.SocketHandler);
    handler.start(socket);
  };

  @inject(TYPES.PlainDb)
  private readonly plainDb: PlainDb;

  constructor() {
    this.server = http.createServer();

    this.io = new Server(this.server, {
      cors: {
        origin: args.cors,
      },
    });

    this.io.on("connection", this.onConnection);
  }

  listen() {
    this.plainDb.add("messages", []);

    this.server.listen(args.port, () => {
      console.info(`listening on ${args.port}`);
    });
  }
}
