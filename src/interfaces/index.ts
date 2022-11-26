import http from 'http';
import { ClientManager } from '../manager';

export interface ServerConfig {
    port: Number,
    host: String,

    secure: boolean
}

export interface ServerValue {
    s: http.Server,
    activate: () => void,
}

export interface ServerContext {
    config: ServerConfig,
    manager: ClientManager,
}