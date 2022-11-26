import { ServerConfig, ServerValue } from "../interfaces/server";

import http from 'http';

export const createServer = (options: ServerConfig): ServerValue => {
    let server = http.createServer();

    return {s: server, activate: () => {
        server.listen({port: options.port, host: options.host});
    }};
}
