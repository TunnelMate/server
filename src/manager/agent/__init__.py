import socket
import threading
from http.client import HTTPConnection
from http.client import HTTPResponse

from logger import Logger
from manager.agent.utils.create import create_server

DEFAULT_MAX_SOCKETS = 10


class Agent(socket.socket):
    def __init__(self, **kwargs):
        super().__init__(socket.AF_INET, socket.SOCK_STREAM)
        self.connected_sockets = 0
        self.max_tcp_sockets = kwargs.get("maxSockets", DEFAULT_MAX_SOCKETS)
        self.client_id = kwargs.get("clientId")

        self.availableSockets = []
        self.waiting_create_conn = []

        self.server = None
        self.started = False

    def listen(self, callback):
        server = self.server
        if self.started:
            raise Exception("already started")

        self.started = True
        self.server = create_server(server, self);
        return self.server.callback(callback)

    def emit(self, name: str, *args):
        if name == "close":
            self.destroy()

    def handle_connection(self, socket):
        if self.connected_sockets >= self.max_tcp_sockets:
            self.emit("close")
            return False

        self.connected_sockets += 1

        # Perform actions with the socket
        # e.g., send a 1 MB file over the socket
        data = b"a" * (1024 * 1024)
        socket.sendall(data)

        self.availableSockets.append(socket)

    def destroy(self):
        Logger.info("destroying agent with id: " + self.client_id)
        self.server_thread.join()
        self.close()
