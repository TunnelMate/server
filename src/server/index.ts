import { ServerContext, ServerValue } from "../interfaces";

import listening from "./events/listening";
import request from "./events/request";

import http from "http";

export const createServer = (context: ServerContext): ServerValue => {
    let server = http.createServer();

    server.on("request", request(context));
    server.on("listening", listening(context));

    return {
        s: server,
        activate: () => {
            server.listen({
                port: context.config.port,
                host: context.config.host,
            });
        },
    };
};
