// The link-preview card, static/og.png (1200x630): the logo and one line, on the night ground.
// Run after changing the logo or the line: node scripts/og.mjs. Needs CHROMIUM_PATH, which the flake's shell sets.
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const logo = readFileSync("static/alpine-digital.svg", "utf8");
const font = readFileSync(
  "node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
).toString("base64");

const html = `<!doctype html>
<style>
  @font-face { font-family: I; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 400 700; }
  html, body { margin: 0; }
  body {
    width: 1200px; height: 630px; box-sizing: border-box; padding: 96px 104px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: #090a0d; color: #eaeff6; font-family: I;
  }
  svg { width: 264px; height: auto; display: block; }
  p { margin: 0; font-size: 72px; font-weight: 600; letter-spacing: -0.035em; line-height: 1.02; }
  p span { color: oklch(0.64 0.012 258); }
</style>
${logo}
<p>The company<br />behind <span>Mortar.</span></p>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "static/og.png" });
await browser.close();
