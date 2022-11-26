import { ServerConfig } from "../../../interfaces/server";

import http from 'http';
import { hri } from 'human-readable-ids';

export default (options: ServerConfig, req: http.IncomingMessage, res: http.ServerResponse) => {
    const newId = hri.random();
    console.log(newId)

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({}));
    res.end();
}
