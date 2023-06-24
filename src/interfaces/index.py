from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Dict, List, Callable, Any
from urllib.parse import parse_qs
from typing import Any
import json

class Client:
    def __init__(self, id, config):
        self.id = id
        self.config = config

class ClientManager:
    def __init__(self):
        self.clients: Dict[str, Client] = {}

    def addClient(self, client: Client):
        self.clients[client.id] = client

    def getClient(self, id: str) -> Client:
        return self.clients[id]

    def removeClient(self, id: str):
        del self.clients[id]

class ServerConfig:
    def __init__(self, port: int, host: str, secure: bool):
        self.port = port
        self.host = host
        self.secure = secure

class ServerValue:
    def __init__(self, server: HTTPServer, activate: Callable[[], None]):
        self.server = server
        self.activate = activate

class ServerContext:
    def __init__(self, config: ServerConfig, manager: ClientManager):
        self.config = config
        self.manager = manager

class ClientOptions:
    def __init__(self, id: str, config: ServerConfig):
        self.id = id
        self.config = config

class ManagerResponse:
    def __init__(self, error: bool, result: Any):
        self.error = error
        self.result = result