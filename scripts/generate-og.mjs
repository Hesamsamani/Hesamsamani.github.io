import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public', 'og.svg'));

await sharp(svg).resize(1200, 630).png().toFile(join(root, 'public', 'og.png'));

console.log('Generated public/og.png');