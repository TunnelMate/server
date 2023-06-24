import logger
from interfaces import ServerConfig, ServerContext
from utils import schema

def start_server(context: ServerContext):
    def listen():
        logger.info(
            f"Passagaway server listening in: {schema.get_schema(context.config)}://"
            f"{context.config.host}:{context.config.port}"
        )

    return listen