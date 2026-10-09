// Renders store screenshots: raw/NN.png + captions -> out/<lang>/NN.png (1080x1920).
// Usage: node StoreScreenshots/render.cjs   (needs `playwright` and internet for Google Fonts)
const { chromium } = require('playwright');
const { mkdirSync } = require('node:fs');
const { join } = require('node:path');
const { pathToFileURL } = require('node:url');

const here = __dirname;

const shots = [
  { img: '01.png', en: ['STACK IT', 'PERFECTLY!'], tr: ['KUSURSUZ', 'DİZ!'] },
  { img: '02.png', en: ['BUILD THE', 'PYRAMID!'],  tr: ['PİRAMİDİ', 'İNŞA ET!'] },
  { img: '03.png', en: ['FREE', 'BOOSTERS!'],      tr: ['BEDAVA', 'YARDIMLAR!'] },
  { img: '04.png', en: ['CHAIN', 'x5 COMBOS!'],    tr: ['x5 KOMBO', 'YAP!'] },
  { img: '05.png', en: ['REACH', 'THE TOP!'],      tr: ['ZİRVEYE', 'ULAŞ!'] },
];

(async () => {
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const template = pathToFileURL(join(here, 'template.html')).href;

for (const lang of ['en', 'tr']) {
  const outDir = join(here, 'out', lang);
  mkdirSync(outDir, { recursive: true });
  for (const s of shots) {
    const [l1, l2] = s[lang];
    const q = new URLSearchParams({ lang, img: pathToFileURL(join(here, 'raw', s.img)).href, l1, l2 });
    await page.goto(`${template}?${q}`);
    await page.waitForSelector('body[data-ready="1"]');
    await page.waitForFunction(() => document.getElementById('shot').complete);
    await page.screenshot({ path: join(outDir, s.img) });
    console.log(`${lang}/${s.img}`);
  }
}
await browser.close();
})();
