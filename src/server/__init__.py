import http
from http.server import HTTPServer
from .events.listening import listening
from .events.request import request

def createServer(context):
    server = HTTPServer()
    server.on("request", request(context))
    server.on("listening", listening(context))

    def activate():
        server.listen({
            "port": context.config.port,
            "host": context.config.host,
        })

    return {
        "s": server,
        "activate": activate,
    }