import net from "net";

export default (self: any, socket: net.Socket) => {
    socket.once('close', (hadError) => {
        self.connectedSockets--;
        const idx = self.availableSockets.indexOf(socket);
        if (idx >= 0) {
            self.availableSockets.splice(idx, 1);
        }

        if (self.connectedSockets <= 0) {
            // @ts-ignore
            self.emit('offline');
        }
    });

    socket.once('error', (_) => {
        socket.destroy();
    });
}
