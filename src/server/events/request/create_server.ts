import { ServerContext } from "../../../interfaces";
import json_res from "./utils/json_res";

import http from 'http';
import { Client } from "../../../manager/client";

export default async (context: ServerContext, req: http.IncomingMessage, res: http.ServerResponse) => {
    const {error, result} = context.manager.createNewClient();
    const client = result as Client;

    if (error) {
        // TODO
    }

    try {
        const info: any = await client.agent.listen();

        let output =  {
            id: client.id,

            port: info.port,
            max_conn_count: 0,
        };

        return json_res(output, res);

    } catch (err) {
        context.manager.removeClient(client.id);
        throw err;
    }
}
