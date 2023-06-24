from interfaces import ClientManager, ServerConfig, ServerContext

def create_context(
    manager: ClientManager,
    config: ServerConfig
) -> ServerContext:
    return ServerContext(config, manager)