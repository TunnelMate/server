from server.events.handles.utils.html_res import html_res
import os

def create_homepage(context, handler):
    content = open(os.path.dirname(__file__) + "/index.html", "r").read()
    return html_res(content, handler)
    