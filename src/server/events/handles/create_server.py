from manager.client import Client
from .utils.json_res import json_res

def create_server(context, handle):
    """Create a new server."""

    client = context.manager.create_new_client()

    try:
        def return_info(info):
            output = {
                'id': client.id,
                'port': info['port'],
                'max_conn_count': 0,
            }

            return json_res(output, handle)
        
        socket = client.agent.listen(return_info)

    except Exception as err:
        context.manager.remove_client(client.id)
        raise err