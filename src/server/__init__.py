from http.server import HTTPServer
from interfaces import ServerContext, ServerConfig

from .events.listening import start_server
from .events.request import create_request_handler

def create_server(context):
    server_address = (context.config["host"], context.config["port"])
    server = HTTPServer(server_address, create_request_handler(context))

    def activate():
        start_server(context)
        server.serve_forever()

    return {
        "s": server,
        "activate": activate,
    }
