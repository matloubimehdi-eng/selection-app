// setup-flags.js
const fs = require('fs');
const https = require('https');
const path = require('path');

const FLAGS_DIR = path.join(__dirname, 'public', 'flags');

// Create flags directory if it doesn't exist
if (!fs.existsSync(FLAGS_DIR)) {
  fs.mkdirSync(FLAGS_DIR, { recursive: true });
}

const flags = [
  { name: 'uk.png', url: 'https://flagcdn.com/w80/gb.png' },
  { name: 'germany.png', url: 'https://flagcdn.com/w80/de.png' },
  { name: 'italy.png', url: 'https://flagcdn.com/w80/it.png' },
  { name: 'spain.png', url: 'https://flagcdn.com/w80/es.png' }
];

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(FLAGS_DIR, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`✓ ${filename} already exists`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

async function setupFlags() {
  console.log('Setting up flag images...\n');
  try {
    await Promise.all(flags.map(flag => downloadFile(flag.url, flag.name)));
    console.log('\n✅ All flags downloaded successfully!');
    console.log(`📁 Location: ${FLAGS_DIR}`);
  } catch (error) {
    console.error('\n❌ Error downloading flags:', error.message);
    console.log('\nPlease manually download flags to:', FLAGS_DIR);
  }
}

setupFlags();