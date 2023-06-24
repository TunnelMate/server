from interfaces import ServerConfig

def get_schema(options: ServerConfig):
    """Get the schema for the server."""
    return "https" if options["secure"] else "http"