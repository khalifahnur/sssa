#!/usr/bin/env node
/**
 * Pulls the list of images and videos from your Cloudinary library into data/media.pool.json.
 * Any slot in data/media.ts that has no explicit `src` is then filled from this pool automatically
 * (videos into video slots, images into image slots, matching portrait/landscape where it can).
 *
 * Usage:  npm run media:sync
 * Needs these in .env.local (Cloudinary console → Settings → API Keys). The secret stays on your machine:
 *   CLOUDINARY_CLOUD_NAME=dtb4hsasc
 *   CLOUDINARY_API_KEY=…
 *   CLOUDINARY_API_SECRET=…
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

async function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of (await readFile(file, 'utf8')).split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
await loadEnv('.env.local');
await loadEnv('.env');

const cloud = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dtb4hsasc';
const key = process.env.CLOUDINARY_API_KEY;
const secret = process.env.CLOUDINARY_API_SECRET;
const api = process.env.CLOUDINARY_API_BASE || `https://api.cloudinary.com/v1_1/${cloud}`;

if (!key || !secret) {
  console.error('Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env.local (see the header of scripts/sync-media.mjs).');
  process.exit(1);
}

const auth = `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`;
const IMAGE_FORMATS = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif', 'heic', 'heif']);

async function list(type) {
  const out = [];
  let cursor;
  do {
    const url = new URL(`${api}/resources/${type}`);
    url.searchParams.set('max_results', '500');
    url.searchParams.set('context', 'true');
    if (cursor) url.searchParams.set('next_cursor', cursor);
    const res = await fetch(url, { headers: { Authorization: auth } });
    if (!res.ok) throw new Error(`Cloudinary ${type} listing failed: ${res.status} ${await res.text()}`);
    const json = await res.json();
    out.push(...json.resources);
    cursor = json.next_cursor;
  } while (cursor);
  return out;
}

let images, videos;
try {
  [images, videos] = await Promise.all([list('image'), list('video')]);
} catch (err) {
  console.error(String(err.message ?? err));
  console.error('Check the cloud name, API key and API secret in .env.local.');
  process.exit(1);
}

const pool = [...images.filter((r) => IMAGE_FORMATS.has((r.format || '').toLowerCase())), ...videos]
  .map((r) => ({
    publicId: r.public_id,
    resourceType: r.resource_type,
    version: r.version,
    width: r.width ?? 0,
    height: r.height ?? 0,
    format: r.format,
    url: r.secure_url,
    alt: r.context?.custom?.alt ?? r.context?.alt,
  }))
  .sort((a, b) => a.publicId.localeCompare(b.publicId));

await writeFile('data/media.pool.json', `${JSON.stringify(pool, null, 2)}\n`);
console.log(`Wrote data/media.pool.json: ${pool.filter((a) => a.resourceType === 'image').length} images, ${pool.filter((a) => a.resourceType === 'video').length} videos.`);
console.log('Slots without an explicit src in data/media.ts now pick from this list. Restart `npm run dev` to see them.');
