import { ServerConfig, ServerValue } from "../interfaces/server";

import listening from "./events/listening";
import request from "./events/request";

import http from 'http';

export const createServer = (options: ServerConfig): ServerValue => {
    let server = http.createServer();

    server.on("request",   request(options));
    server.on("listening", listening(options));

    return {s: server, activate: () => {
        server.listen({port: options.port, host: options.host});
    }};
}
