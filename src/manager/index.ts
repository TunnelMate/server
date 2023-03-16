import { ClientOptions, ManagerResponse, ServerConfig } from "../interfaces";
import createClient, { Client } from "./client";

import { hri } from "human-readable-ids";

export class ClientManager {
    private clients: Map<String, Client>;
    private readonly options: ServerConfig;

    constructor(opts: ServerConfig) {
        this.options = opts;
        this.clients = new Map();
    }

    public createNewClient(): ManagerResponse {
        const newId = hri.random();

        const clientOpts = this.createClientOpts(newId);
        const client = createClient(clientOpts);

        this.appendClient(newId, client);
        return { error: false, result: client };
    }

    public removeClient(id: String): boolean {
        return this.clients.delete(id);
    }

    public getClient(id: String): Client {
        return this.clients.get(id);
    }

    // private functions
    private createClientOpts(id: String): ClientOptions {
        const config = this.options;
        return { id, config };
    }

    private appendClient(id: String, client: Client): void {
        this.clients.set(id, client);
    }
}

export default /* createManager */ (options: ServerConfig): ClientManager => {
    return new ClientManager(options);
};
