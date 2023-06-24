
def handle_request(options, req, res, id):
    manager = options.manager
    client = manager.getClient(id)

    if client is None:
        res.statusCode = 404
        return res.end("404")

    return client.handle(req, res)
