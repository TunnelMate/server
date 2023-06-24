from .. import ServerContext, ServerConfig
from typing import Optional

from tldextract import extract
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from .handles.create_server import create_server
from .handles.handle_request import handle_request
from pages.home import create_homepage

def get_subdomain(host: str) -> Optional[str]:
    """Get the subdomain from a URL."""
    tld = extract(host)
    return tld.subdomain

def create_request_handler(context: ServerContext):
    """Create a request handler for the server."""
    class S(BaseHTTPRequestHandler):
        def do_GET(self):
            subdomain = get_subdomain(self.headers["host"])

            if subdomain:
                return handle_request(context, self, subdomain)

            if urlparse(self.path, allow_fragments=False).query == "create":
                return create_server(context, self)

            return create_homepage(context, self)


    return S