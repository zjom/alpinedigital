// Screenshots of the page at desktop and phone width, for looking at a change: node scripts/shots.mjs <base url> <out dir>.
// Needs CHROMIUM_PATH, which the flake's shell sets.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const [base = "http://localhost:5173", out = ".shots"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const SIZES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
for (const size of SIZES) {
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 0) console.log(`${size.name}: overflows sideways by ${overflow}px`);
  await page.screenshot({ path: `${out}/${size.name}.png`, fullPage: true });
  await context.close();
}
await browser.close();
