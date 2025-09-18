#!/usr/bin/env python3
"""
Custom HTTP Server with Clean URL Support
Maps clean URLs to HTML files automatically
"""

import http.server
import socketserver
import os
import urllib.parse
from pathlib import Path

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]
        
        # If path is empty, redirect to home
        if not path or path == '':
            self.send_response(302)
            self.send_header('Location', '/home')
            self.end_headers()
            return
        
        # Map clean URLs to HTML files
        url_mappings = {
            'home': 'home.html',
            'projects': 'projects.html',
            'experience': 'experience.html',
            'tech-stack': 'tech-stack.html',
            'resume': 'resume.html',
            'contact': 'contact.html'
        }
        
        # Check if this is a clean URL that needs mapping
        if path in url_mappings:
            html_file = url_mappings[path]
            if os.path.exists(html_file):
                # Serve the HTML file
                self.path = f'/{html_file}'
                return super().do_GET()
        
        # Check if the file exists directly
        if os.path.exists(path):
            return super().do_GET()
        
        # Check if it's an HTML file request
        if path.endswith('.html'):
            return super().do_GET()
        
        # Check if it's a clean URL that should map to an HTML file
        if path in url_mappings:
            html_file = url_mappings[path]
            if os.path.exists(html_file):
                self.path = f'/{html_file}'
                return super().do_GET()
        
        # If nothing found, try to serve the file as-is
        return super().do_GET()

def run_server(port=8000):
    """Run the server on the specified port"""
    with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
        print(f"🚀 Server running on http://localhost:{port}")
        print(f"📁 Clean URLs supported:")
        print(f"   • /home → home.html")
        print(f"   • /projects → projects.html")
        print(f"   • /experience → experience.html")
        print(f"   • /tech-stack → tech-stack.html")
        print(f"   • /resume → resume.html")
        print(f"   • /contact → contact.html")
        print(f"   • / → redirects to /home")
        print(f"\n🌐 Visit: http://localhost:{port}/home")
        print("Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    run_server(10000)
