import http from "http";
import { ClientManager } from "../manager";
import { Client } from "../manager/client";

export interface ServerConfig {
    port: Number;
    host: String;

    secure: boolean;
}

export interface ServerValue {
    s: http.Server;
    activate: () => void;
}

export interface ServerContext {
    config: ServerConfig;
    manager: ClientManager;
}

export interface ClientOptions {
    id: String;
    config: ServerConfig;
}

export interface ManagerResponse {
    error: boolean;
    result: String | Client;
}
