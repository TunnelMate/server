import html_res from "../server/events/request/utils/html_res";
import * as fs from "fs";
import * as path from "path";
import http from "http";

import { ServerContext } from "../interfaces";

export function create_homepage(context: ServerContext,
    req: http.IncomingMessage,
    res: http.ServerResponse) {
    let content = fs.readFileSync(path.join(__dirname, "index.html"));
    return html_res(content.toString(), res);
}