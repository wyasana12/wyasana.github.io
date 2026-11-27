import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');
const indexHtmlPath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(ssrDir, 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntryPath).href);
const appHtml = render();

if (!appHtml.includes('<h1') || !appHtml.includes('Wyasana Aji Kusuma Wardana')) {
  throw new Error('Pre-render verification failed: expected portfolio HTML content was not found.');
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');
const target = '<div id="root"></div>';

if (!template.includes(target)) {
  throw new Error(`Pre-render failed: could not find ${target} in dist/index.html.`);
}

const prerenderedHtml = template.replace(target, `<div id="root">${appHtml}</div>`);
fs.writeFileSync(indexHtmlPath, prerenderedHtml, 'utf-8');

// Clean up temporary SSR build folder
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`Pre-rendered dist/index.html (${Buffer.byteLength(appHtml, 'utf-8')} bytes of HTML injected).`);

