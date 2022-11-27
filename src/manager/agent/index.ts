
import { Agent } from 'http';
import net from 'net';

import createServer from "./utils/create";
import fillSocket from "./utils/socket";

import logger from '../../logger';

const DEFAULT_MAX_SOCKETS = 10;

export default class extends Agent {

    private cliendID: string;

    private connectedSockets: number = 0;
    private maxTcpSockets: number;

    private availableSockets: net.Socket[] = [];
    private waitingCreateConn: any[] = [];

    private server: net.Server;
    private started: Boolean = false;

    constructor(options: any = {}) {
        super({
            maxFreeSockets: 1,
            keepAlive: true,
        });

        this.server = net.createServer();
        this.maxTcpSockets = options.maxSockets || DEFAULT_MAX_SOCKETS;
        this.cliendID = options.cliendID;
    }

    listen() {
        const server = this.server;
        if (this.started) {
            throw new Error('already started');
        }

        this.started = true;

        let listen = createServer(server, this);

        return new Promise((resolve) => {
            listen((port: number) => {
                resolve({
                    port,
                });
            })
        });
    }

    private onConnection(socket) {
        if (this.connectedSockets >= this.maxTcpSockets) {
            socket.destroy();
            return false;
        }

        fillSocket(this, socket);

        this.connectedSockets++;
        const fn = this.waitingCreateConn.shift();
        if (fn) {
            setTimeout(() => {
                fn(null, socket);
            }, 0);
            return;
        }

        this.availableSockets.push(socket);
    }

    destroy() {
        this.server.close();
        super.destroy();
    }
}
