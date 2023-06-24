from human_id import generate_id

from .client import Client

class ClientManager:
    def __init__(self, opts):
        self.clients = {}
        self.options = opts

    def create_new_client(self):
        newId = generate_id(word_count=3)

        clientOpts = self.createClientOpts(newId)
        client = Client(clientOpts)

        self.appendClient(newId, client)
        return client

    def remove_client(self, id):
        del self.clients[id]

    def get_client(self, id):
        return self.clients[id]

    # private functions
    def createClientOpts(self, id):
        config = self.options
        return { 'id': id, 'config': config }

    def appendClient(self, id, client):
        self.clients[id] = client