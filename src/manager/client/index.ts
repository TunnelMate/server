import { ClientOptions, ServerConfig } from "../../interfaces";

import pump from "pump";
import http from "http";

import Agent from "../agent";

const MAX_SOCKETS = 10;

export class Client {
    public readonly id: String;
    public readonly agent: Agent;

    constructor(options: ClientOptions) {
        this.id = options.id;
        this.agent = new Agent({
            clientId: this.id,
            maxSockets: MAX_SOCKETS,
        });
    }

    public handle(req: http.IncomingMessage, res: http.ServerResponse) {
        const clientReq = http.request(
            this.createRequestsOpts(req, res),
            (clientRes) => {
                res.writeHead(clientRes.statusCode, clientRes.headers);
                pump(clientRes, res);
            }
        );

        clientReq.once("error", (_err) => {});
        pump(req, clientReq);
    }

    private createRequestsOpts(
        req: http.IncomingMessage,
        _res: http.ServerResponse
    ) {
        return {
            path: req.url,
            agent: this.agent as any,
            method: req.method,
            headers: req.headers,
        };
    }
}

export default /* createClient*/ (options: ClientOptions) => {
    return new Client(options);
};
