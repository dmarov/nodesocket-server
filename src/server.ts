import { Server } from "socket.io";
import http from "http";
import { args } from "./utils/args";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: args.cors,
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket);
});

server.listen(4000, () => {
  console.log("listening on 4000");
});
