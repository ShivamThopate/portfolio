import os

html_dir = '.'
html_files = [f for f in os.listdir(html_dir) if f.endswith('.html') and f not in ('navbar.html', 'footer.html')]

old_line = '<script src="assets/script.js"></script>'
new_lines = '<script src="assets/script.js"></script>\n<script src="assets/js/interactions.js" defer></script>'

for file in html_files:
    path = os.path.join(html_dir, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'assets/js/interactions.js' not in content:
        content = content.replace(old_line, new_lines)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
    else:
        print(f'Skipped {file} (already has interactions.js)')

print('Done!')
