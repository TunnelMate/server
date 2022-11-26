import { ServerContext } from "../../../interfaces";
import json_res from "./utils/json_res";

import http from 'http';
import { hri } from 'human-readable-ids';

export default (context: ServerContext, req: http.IncomingMessage, res: http.ServerResponse) => {
    const newId = hri.random();



    json_res({}, res);
}
