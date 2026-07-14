import os

html_dir = '.'
html_files = [f for f in os.listdir(html_dir) if f.endswith('.html') and f not in ('navbar.html', 'footer.html')]

for file in html_files:
    path = os.path.join(html_dir, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'main.min.css' in content:
        content = content.replace('main.min.css', 'main.css')
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Switched {file} to main.css')

print('Done!')
