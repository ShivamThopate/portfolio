import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

replacements = {
    "Kethan Dosapati": "Shivam Thopate",
    "kethandosapati": "ShivamThopate",
    "dkethan": "ShivamThopate",
    "DKethan": "ShivamThopate",
    "Dosapati": "Thopate",
    "Kethan": "Shivam",
    "kethan-dosapati": "shivam-thopate-582119304",
    "AI Engineer": "Software Engineer & AI Specialist",
    "kethandosapati@gmail.com": "thopateshivam@gmail.com",
    "New Jersey": "Pune",
    "USA": "India",
    "US-NJ": "IN-MH"
}

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("SEO Cleanup complete!")
