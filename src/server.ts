import { Server } from "socket.io";
import http from "http";
import { args } from "./utils/args";
import { SocketHandler } from "./core/socket-handler";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: args.cors,
  },
});

io.on("connection", (socket) => {
  const handler = new SocketHandler(socket);
  handler.start();
});

server.listen(args.port, () => {
  console.log(`listening on ${args.port}`);
});
