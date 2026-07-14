import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We'll inject scripts just before </body>
scripts_to_inject = """
  <!-- External Scripts for Animations -->
  <script src="https://cdn.jsdelivr.net/npm/tsparticles-preset-network@2/tsparticles.preset.network.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js"></script>
"""

# Regex to find starfield block
starfield_regex = re.compile(r'<div class="starfield[^>]*>.*?</div>\s*</div>', re.DOTALL)
starfield_grey_regex = re.compile(r'<div class="starfield-grey[^>]*>.*?</div>\s*</div>', re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace starfields with particles
    content = starfield_regex.sub('<div id="tsparticles" class="particles-bg"></div>', content)
    content = starfield_grey_regex.sub('<div id="tsparticles-grey" class="particles-bg"></div>', content)

    # Inject scripts
    if 'tsparticles.preset' not in content:
        content = content.replace('</body>', scripts_to_inject + '\n</body>')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Particles and scripts injected!")
