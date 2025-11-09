const fs = require('fs');
const https = require('https');
const path = require('path');

const FLAGS_DIR = path.join(__dirname, 'public', 'flags');

if (!fs.existsSync(FLAGS_DIR)) {
  fs.mkdirSync(FLAGS_DIR, { recursive: true });
}

const flags = [
  { name: 'iran.png', url: 'https://flagcdn.com/w80/ir.png' },
  { name: 'turkey.png', url: 'https://flagcdn.com/w80/tr.png' },
  { name: 'netherlands.png', url: 'https://flagcdn.com/w80/nl.png' },
  { name: 'canada.png', url: 'https://flagcdn.com/w80/ca.png' },
  { name: 'sweden.png', url: 'https://flagcdn.com/w80/se.png' }
];

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(FLAGS_DIR, filename);
    
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
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function setupFlags() {
  console.log('Setting up new flag images...\n');
  try {
    // Remove old flags
    fs.readdirSync(FLAGS_DIR).forEach(file => {
      fs.unlinkSync(path.join(FLAGS_DIR, file));
    });
    console.log('✓ Cleared old flags\n');
    
    // Download new flags
    await Promise.all(flags.map(flag => downloadFile(flag.url, flag.name)));
    console.log('\n✅ All new flags downloaded successfully!');
    console.log(`📁 Location: ${FLAGS_DIR}`);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nPlease manually download flags to:', FLAGS_DIR);
  }
}

setupFlags();