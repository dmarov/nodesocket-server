import "@/polyfills";
import { container, TYPES } from "@/di";
import { SocketServer } from "@/socket-server";

const server = container.get<SocketServer>(TYPES.SocketServer);

server.listen();
