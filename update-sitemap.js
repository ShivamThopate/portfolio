#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const sitemapPath = './sitemap.xml';
const baseUrl = 'https://dkethan.github.io/kethandosapati';

// Map of URL paths to HTML files
const urlFileMap = {
  '/': 'index.html',
  '/home': 'home.html',
  '/projects': 'projects.html',
  '/experience': 'experience.html',
  '/tech-stack': 'tech-stack.html',
  '/resume': 'resume.html',
  '/contact': 'contact.html'
};

function getFileModificationDate(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0]; // YYYY-MM-DD format
  } catch (error) {
    console.warn(`Warning: Could not get modification date for ${filePath}`);
    return new Date().toISOString().split('T')[0];
  }
}

function updateSitemap() {
  console.log('🔄 Updating sitemap with latest modification dates...');

  // Read current sitemap
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

  // Update lastmod for each URL
  Object.entries(urlFileMap).forEach(([urlPath, fileName]) => {
    const filePath = path.join(__dirname, fileName);
    const lastmod = getFileModificationDate(filePath);
    const fullUrl = baseUrl + urlPath;

    // Find and replace the lastmod for this URL
    const urlPattern = new RegExp(
      `(<url>\\s*<loc>${fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>\\s*<lastmod>)[^<]+(</lastmod>)`,
      'i'
    );

    if (urlPattern.test(sitemapContent)) {
      sitemapContent = sitemapContent.replace(urlPattern, `$1${lastmod}$2`);
      console.log(`✅ Updated ${urlPath} → ${lastmod}`);
    } else {
      console.warn(`⚠️  Could not find URL pattern for ${urlPath}`);
    }
  });

  // Write updated sitemap
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('🎉 Sitemap updated successfully!');
}

// Run the update
updateSitemap();