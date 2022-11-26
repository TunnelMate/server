import http from 'http';

export interface ServerConfig {
    port: Number,
    host: String,

    secure: boolean
}

export interface ServerValue {
    s: http.Server,
    activate: () => void,
}
