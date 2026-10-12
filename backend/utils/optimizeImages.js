import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../../frontend/public');
const infrastructureDir = path.join(publicDir, 'infrastructure');
const imageDir = path.join(publicDir, 'image');

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (file.includes('-temp')) {
      try { fs.unlinkSync(filePath); } catch (_) {}
      continue;
    }
    const ext = path.extname(file).toLowerCase();
    
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const baseName = path.basename(file, ext);
      const webpPath = path.join(dirPath, `${baseName}.webp`);
      const thumbWebpPath = path.join(dirPath, `${baseName}-thumb.webp`);
      
      const fileBuffer = fs.readFileSync(filePath);
      const originalKB = (fileBuffer.length / 1024).toFixed(1);

      try {
        const metadata = await sharp(fileBuffer).metadata();

        // 1. High-fidelity Desktop/Hero WebP (Max width 1600px, 82% quality)
        const webpBuffer = await sharp(fileBuffer)
          .resize({ width: Math.min(metadata.width || 1600, 1600), withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 })
          .toBuffer();
        
        fs.writeFileSync(webpPath, webpBuffer);
        const webpKB = (webpBuffer.length / 1024).toFixed(1);
        const reduction = (((fileBuffer.length - webpBuffer.length) / fileBuffer.length) * 100).toFixed(1);

        console.log(`[WebP 1600w] ${file} (${originalKB} KB) -> ${baseName}.webp (${webpKB} KB) | Saved: ${reduction}%`);

        // 2. Fast Grid/Card/Mobile Thumbnail WebP (Max width 600px, 80% quality)
        const thumbBuffer = await sharp(fileBuffer)
          .resize({ width: Math.min(metadata.width || 600, 600), withoutEnlargement: true })
          .webp({ quality: 80, effort: 5 })
          .toBuffer();
        
        fs.writeFileSync(thumbWebpPath, thumbBuffer);
        const thumbKB = (thumbBuffer.length / 1024).toFixed(1);
        console.log(`  └─ [Thumb 600w] ${baseName}-thumb.webp (${thumbKB} KB)`);

        // 3. Optimize original JPG/PNG in place (Max width 1600px) as reliable fallback
        let optimizedOriginalBuffer;
        if (ext === '.png') {
          optimizedOriginalBuffer = await sharp(fileBuffer)
            .resize({ width: Math.min(metadata.width || 1600, 1600), withoutEnlargement: true })
            .png({ quality: 85, compressionLevel: 9 })
            .toBuffer();
        } else {
          optimizedOriginalBuffer = await sharp(fileBuffer)
            .resize({ width: Math.min(metadata.width || 1600, 1600), withoutEnlargement: true })
            .jpeg({ quality: 82, mozjpeg: true })
            .toBuffer();
        }

        if (optimizedOriginalBuffer.length < fileBuffer.length) {
          fs.writeFileSync(filePath, optimizedOriginalBuffer);
          console.log(`  └─ [Optimized Fallback] ${file}: ${originalKB} KB -> ${(optimizedOriginalBuffer.length / 1024).toFixed(1)} KB`);
        }

      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }
}

async function run() {
  console.log('=== ZIPS COMPLETE IMAGE OPTIMIZATION PIPELINE ===');
  console.log('--- Processing Infrastructure Directory ---');
  await processDirectory(infrastructureDir);
  console.log('\n--- Processing Banner & Campus Image Directory ---');
  await processDirectory(imageDir);
  console.log('\n--- Processing Root Public Directory ---');
  await processDirectory(publicDir);
  console.log('\n=== ALL IMAGES OPTIMIZED SUCCESSFULLY ===');
}

run();
