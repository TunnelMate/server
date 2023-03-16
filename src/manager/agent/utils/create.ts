import net from "net";
import { Agent } from "http";
import logger from "../../../logger";
import { create } from "ts-node";

function createServer(server: net.Server, self: any) {
    server.on("close", () => {
        for (const conn of self.waitingCreateConn) {
            conn(new Error("closed"), null);
        }

        self.waitingCreateConn = [];

        // @ts-ignore
        self.emit("end");
    });

    server.on("connection", self.onConnection.bind(self));
    server.on("error", (err: any) => {
        if (err.code == "ECONNRESET" || err.code == "ETIMEDOUT") {
            return;
        }

        console.log(err);
    });

    return (cb: (port: number) => void) => {
        server.listen(() => {
            const port = (server.address() as net.AddressInfo).port;
            logger.info(`tcp server listening on port: ${port}`);

            cb(port);
        });
    };
}

export default createServer;
