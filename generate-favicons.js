const sharp = require('sharp');

async function generateFavicons() {
  const sizes = [16, 32, 192, 512];
  const source = './public/logo.png';

  try {
    // Generate PNG favicons
    for (const size of sizes) {
      const filename = size === 192 || size === 512 
        ? `android-chrome-${size}x${size}.png`
        : `favicon-${size}x${size}.png`;
      
      await sharp(source)
        .resize(size, size)
        .toFile(`./public/${filename}`);
      
      console.log(`Generated ${filename}`);
    }

    // Generate apple touch icon
    await sharp(source)
      .resize(180, 180)
      .toFile('./public/apple-touch-icon.png');
    console.log('Generated apple-touch-icon.png');

    // Generate favicon.ico (16x16)
    await sharp(source)
      .resize(16, 16)
      .toFile('./public/favicon.ico');
    console.log('Generated favicon.ico');

    console.log('All favicon files have been generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 