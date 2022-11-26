import { ServerConfig, ServerContext } from "../../interfaces";
import { getSchema } from "../utils/schema";
import logger from "../../logger";

import http from 'http';
import url from 'url';

import create_server from "./request/create_server";
import handle_request from "./request/handle_request";

export default (context: ServerContext) => {
    return (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (url.parse(req.url, true).query['create'] !== undefined) {
            create_server(context, req, res);
        }
    }
}