from server_context import ServerContext
from server_config import ServerConfig
from typing import Optional

from tld import get_tld
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from create_server import create_server
from handle_request import handle_request
from create_homepage import create_homepage

def get_subdomain(url: str) -> Optional[str]:
    """Get the subdomain from a URL."""
    parsed_url = urlparse(url)
    host = parsed_url.netloc
    tld = get_tld(host, as_object=True)
    return tld.subdomain

def create_request_handler(context: ServerContext):
    """Create a request handler for the server."""
    def request_handler(request: BaseHTTPRequestHandler):
        subdomain = get_subdomain(request.headers.host)

        if subdomain:
            return handle_request(context, request, subdomain)

        if urlparse(request.path, allow_fragments=False).query == "create":
            return create_server(context, request)

        return create_homepage(context, request)

    return request_handler