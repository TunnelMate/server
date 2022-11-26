import { ServerContext } from "../../../interfaces";

import http from 'http';

export default (options: ServerContext, req: http.IncomingMessage, res: http.ServerResponse, id: String) => {
    let manager = options.manager;
    let client = manager.getClient(id);

    if (!client) {
        res.statusCode = 404;
        return res.end('404');
    }

    return client.handle(req, res)

}
