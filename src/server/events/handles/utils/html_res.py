
def html_res(out, handler):
    handler.send_response(200)
    handler.send_header('Content-type', 'text/html')
    handler.end_headers()
    handler.wfile.write(out.encode("utf-8"))
