from server import create_server
from context import create_context
from manager import ClientManager
from config import server_info

def main():
    manager = ClientManager(server_info)
    context = create_context(manager, server_info)

    s = create_server(context)
    s["activate"]()
    
main()