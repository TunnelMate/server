import socket
import socketserver
import threading
from logger import Logger

def create_server(server, agent):
    class MyTCPServer(socketserver.ThreadingTCPServer):
        def server_close(self):
            for conn in agent.waiting_create_conn:
                conn(Exception("closed"), None)
            agent.waiting_create_conn = []
            agent.emit("end")

        def process_request(self, request, client_address):
            self.on_connection(request)

        def handle_error(self, request, client_address):
            err = self.get_request_error(request)
            if err.errno == socket.ECONNRESET or err.errno == socket.ETIMEDOUT:
                return
            Logger.error(err)

        def callback(self, cb):
            #self.server_bind()
            self.server_activate()
            port = self.server_address[1]
            Logger.info(f"TCP server listening on port: {port}")
            cb({"port":port})

    tcp_server = MyTCPServer(('', 0), server)
    tcp_server.on_connection = agent.handle_connection

    def on_close():
        tcp_server.server_close()

    tcp_server.shutdown_request = on_close

    return tcp_server
