from server import Server
from context import Context
from manager import Manager
from config import server_info

def main():
    manager = Manager(server_info)
    context = Context(manager, server_info)

    s = Server(context)
    s.activate()
    
main()