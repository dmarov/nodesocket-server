import "./polyfills";
import { Server, Socket } from "socket.io";
import http, { Server as HttpServer } from "http";
import { args } from "./utils/args";
import { container } from "./di.config";
import { TYPES } from "./types";
import { SocketHandler } from "./core/socket-handler/socket-handler";

class SocketServer {
  private readonly server: HttpServer;
  private readonly io: Server;

  private readonly onConnection = (socket: Socket) => {
    const handler = container.get<SocketHandler>(TYPES.SocketHandler);
    handler.start(socket);
  };

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
    this.server.listen(args.port, () => {
      console.log(`listening on ${args.port}`);
    });
  }
}

const server = new SocketServer();

server.listen();
