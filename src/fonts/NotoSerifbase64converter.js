const fs = require('fs');
const path = require('path');
const ff=require('../fonts/NotoSerifDevanagari-Regular.ttf')
// Replace 'NotoSerifDevanagari-Regular.ttf' with your font file path
const fontPath = path.join(__dirname,ff);

fs.readFile(fontPath, (err, data) => {
  if (err) {
    console.error('Error reading font file:', err);
    return;
  }
  const base64 = data.toString('base64');
  console.log(base64);
});
