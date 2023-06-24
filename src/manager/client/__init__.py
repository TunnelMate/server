import http.client as httplib
from http.server import BaseHTTPRequestHandler


from manager.agent import Agent

MAX_SOCKETS = 10

class Client:
    def __init__(self, options):
        self.id = options["id"]
        self.agent = Agent(clientId=self.id, maxSockets=MAX_SOCKETS)

    def handle(self, req, res):
        client_req = httplib.HTTPConnection("localhost")
        client_req.request(
            req.method,
            req.url,
            headers=req.headers,
        )
        client_res = client_req.getresponse()
        res.send_response(client_res.status)
        for header, value in client_res.headers.items():
            res.send_header(header, value)
        res.end_headers()

    def create_requests_opts(self, req, _res):
        return {
            "path": req.url,
            "method": req.method,
            "headers": req.headers,
        }
    
def create_client(options):
    return Client(options)