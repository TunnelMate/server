import json

def json_res(out, handler):
    handler.send_response(200)
    handler.send_header('Content-type', 'application/json')
    handler.end_headers()

    handler.wfile.write(json.dumps(out).encode("utf-8"))