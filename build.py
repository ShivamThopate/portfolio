import os
import re

CSS_DIR = os.path.join('assets', 'css')
MAIN_CSS = os.path.join(CSS_DIR, 'main.css')
MIN_CSS = os.path.join(CSS_DIR, 'main.min.css')

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# 1. Parse main.css to find imports
with open(MAIN_CSS, 'r', encoding='utf-8') as f:
    main_content = f.read()

# Match @import url('./base.css');
imports = re.findall(r"@import url\(['\"]?\.\/([^'\"]+\.css)['\"]?\);", main_content)

print(f"Found {len(imports)} CSS files to bundle.")

# 2. Bundle CSS
bundled_css = ""
for css_file in imports:
    file_path = os.path.join(CSS_DIR, css_file)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            bundled_css += f"/* --- {css_file} --- */\n"
            # Basic minification: remove comments and excess whitespace
            content = f.read()
            content = re.sub(r'/\*[\s\S]*?\*/', '', content) # remove comments
            content = re.sub(r'\s+', ' ', content) # collapse whitespace
            content = content.replace('; ', ';').replace(': ', ':').replace(' {', '{').replace('} ', '}')
            bundled_css += content + "\n"

with open(MIN_CSS, 'w', encoding='utf-8') as f:
    f.write(bundled_css)

print(f"Bundled CSS saved to {MIN_CSS}")

# 3. Update HTML files
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    if 'assets/css/main.css' in html_content:
        html_content = html_content.replace('assets/css/main.css', 'assets/css/main.min.css')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Updated {file}")

print("Build complete!")
