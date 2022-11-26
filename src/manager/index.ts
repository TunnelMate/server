
import { ServerConfig } from "../interfaces";
import Client from "./client";

export class ClientManager {
    private clients: Map<String, Client>;
    private readonly options: ServerConfig;

    constructor(opts: ServerConfig)  {
        this.options = opts;
    }
}

export default /* createManager */ (options: ServerConfig): ClientManager => {
    return new ClientManager(options)
}

