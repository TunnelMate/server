from interfaces import ServerConfig

def getSchema(options: ServerConfig):
    """Get the schema for the server."""
    return "https" if options.secure else "http"