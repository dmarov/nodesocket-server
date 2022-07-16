import "./polyfills";

import { container } from "./di/config";
import { TYPES } from "./di/types";
import { SocketServer } from "./socket-server";

const server = container.get<SocketServer>(TYPES.SocketServer);

server.listen();
