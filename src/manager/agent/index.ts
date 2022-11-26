
import { Agent } from 'http';
import net from 'net';
import logger from '../../logger';

const DEFAULT_MAX_SOCKETS = 10;

export default class extends Agent {

    private connectedSockets: number = 0;
    private maxTcpSockets: number = DEFAULT_MAX_SOCKETS;

    private availableSockets: Array<any> = [];
    private waitingCreateConn: Array<any> = [];

    private server: net.Server;

    private started: Boolean = false;
    private closed: Boolean = false;

    constructor(options = {}) {
        super({
            maxFreeSockets: 1,
            keepAlive: true,
        });

        this.server = net.createServer();

        this.waitingCreateConn = []
        this.availableSockets = []
    }

    listen() {
        const server = this.server;
        if (this.started) {
            throw new Error('already started');
        }

        this.started = true;

        server.on('close', () => {
            this.closed = true;
            
            for (const conn of this.waitingCreateConn) {
                conn(new Error('closed'), null);
            }
    
            this.waitingCreateConn = [];
    
            // @ts-ignore
            this.emit('end');
        });

        server.on('connection', this.onConnection.bind(this));
        server.on('error', (err: any) => {
            if (err.code == 'ECONNRESET' || err.code == 'ETIMEDOUT') {
                return;
            }

            console.log(err)
        });

        return new Promise((resolve) => {
            server.listen(() => {

                // @ts-ignore
                const port = server.address().port;
                logger.info(`tcp server listening on port: ${port}`);

                resolve({
                    port: port,
                });
            });
        });
    }

    private onConnection(socket) {
        if (this.connectedSockets >= this.maxTcpSockets) {
            socket.destroy();
            return false;
        }

        socket.once('close', (hadError) => {
            this.connectedSockets -= 1;
            const idx = this.availableSockets.indexOf(socket);
            if (idx >= 0) {
                this.availableSockets.splice(idx, 1);
            }

            if (this.connectedSockets <= 0) {
                // @ts-ignore
                this.emit('offline');
            }
        });

        socket.once('error', (_) => {
            socket.destroy();
        });

        if (this.connectedSockets === 0) {
            // @ts-ignore
            this.emit('online');
        }

        this.connectedSockets += 1;

        const fn = this.waitingCreateConn.shift();
        if (fn) {
            setTimeout(() => {
                fn(null, socket);
            }, 0);
            return;
        }

        this.availableSockets.push(socket);
    }

    createConnection(options, cb) {
        if (this.closed) {
            cb(new Error('closed'));
            return;
        }

        const sock = this.availableSockets.shift();
        if (!sock) {
            this.waitingCreateConn.push(cb);
            return;
        }

        cb(null, sock);
    }

    destroy() {
        this.server.close();
        super.destroy();
    }
}
