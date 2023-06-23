import { ServerConfig, ServerContext } from "../../interfaces";
import { getSchema } from "../utils/schema";
import logger from "../../logger";

import tldjs from "tldjs";
import http from "http";
import url from "url";

import create_server from "./request/create_server";
import handle_request from "./request/handle_request";
import { create_homepage } from "../../pages/home";

export default (context: ServerContext) => {
    const tld = tldjs.fromUserSettings({
        validHosts: [context.config.host],
    });

    return (req: http.IncomingMessage, res: http.ServerResponse) => {
        const subdomain = tld.getSubdomain(req.headers.host);
        if (subdomain) {
            return handle_request(context, req, res, subdomain);
        }

        if (url.parse(req.url, true).query["create"] !== undefined) {
            return create_server(context, req, res);
        }

        return create_homepage(context, req, res);
    };
};
