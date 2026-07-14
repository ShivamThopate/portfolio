import http.server
import socketserver
import os

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # If the request is for a clean URL (no extension) and it's not a directory or root
        if self.path != '/' and not os.path.splitext(self.path)[1]:
            # Check if the .html version exists
            if os.path.exists(self.translate_path(self.path + '.html')):
                self.path += '.html'
        return super().do_GET()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
