from logger import Logger
from interfaces import ServerConfig, ServerContext
from ..utils import get_schema

def start_server(context: ServerContext):
    Logger.info(
        f"Passagaway server listening in: {get_schema(context.config)}://"
        f"{context.config['host']}:{context.config['port']}"
    )