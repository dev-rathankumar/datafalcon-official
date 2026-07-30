import { chromium } from "playwright";
import fs from "fs";

const BASE = "http://localhost:5174";
const outDir = "verify-shots";
fs.mkdirSync(outDir, { recursive: true });

const consoleErrors = [];
const pageErrors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on("console", msg => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
page.on("pageerror", err => pageErrors.push(String(err)));

async function shot(name) {
  await page.screenshot({ path: `${outDir}/${name}.png` });
  console.log("shot:", name);
}

// 1) direct nav to /our-work
await page.goto(`${BASE}/our-work`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Enterprise Data");
await shot("01-hero");

// 2) nav link from homepage
await page.goto(BASE, { waitUntil: "networkidle" });
const navLink = page.locator("a, [class*='df-a']", { hasText: "Our Work" }).first();
await navLink.click();
await page.waitForURL(/\/our-work$/);
const navClass = await page.locator(".df-a", { hasText: "Our Work" }).getAttribute("class");
console.log("nav link class after click:", navClass, "url:", page.url());

// 3) scroll through sections + screenshots
const sections = [
  ["text=Enterprise Transformation Journey", "02-journey"],
  ["text=Interactive Architecture Explorer", "03-architecture-explorer"],
  ["text=Enterprise Success Stories", "04-success-stories"],
  ["text=Technology Ecosystem", "05-tech-ecosystem"],
  ["text=Delivery Framework", "06-delivery-framework"],
  ["text=Results measured in production", "07-outcomes"],
  ["text=Why Enterprises Choose Kaizen Agentics", "08-why-df"],
  ["text=Let's Build Your Modern Data Platform.", "09-final-cta"],
];
for (const [sel, name] of sections) {
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(name);
}

// 4) architecture explorer: click through 4 tabs, 2 nodes each
await page.locator("text=Interactive Architecture Explorer").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const tabLabels = ["Azure Databricks Lakehouse", "Microsoft Fabric", "Unity Catalog Migration", "Enterprise AI"];
for (const label of tabLabels) {
  await page.locator("button", { hasText: label }).click();
  await page.waitForTimeout(400);
  const nodeButtons = page.locator("button").filter({ hasText: /.+/ }).and(page.locator("button"));
  // grab node chip buttons specifically within the flow area
  const chips = await page.locator("div.df-arch-flow button, div[class]:has(> div > button)").all();
  // simpler: query all buttons inside the diagram container via a more targeted approach
  const flow = page.locator(".df-arch-flow");
  const chipButtons = flow.locator("button");
  const count = await chipButtons.count();
  console.log(label, "node count:", count);
  for (let i = 0; i < Math.min(2, count); i++) {
    const btn = chipButtons.nth(i);
    const label2 = await btn.textContent();
    await btn.click();
    await page.waitForTimeout(500);
    const hasPurpose = await page.locator("text=Purpose").count();
    const hasImpl = await page.locator("text=How Kaizen Agentics Implements It").count();
    const panelTitle = await page.locator("div").filter({ hasText: /./ }).first();
    console.log(`  clicked node "${label2}" -> Purpose visible: ${hasPurpose > 0}, Implementation visible: ${hasImpl > 0}`);
    await shot(`arch-${label.replace(/\s+/g, "_")}-node${i}`);
    // close panel
    const closeBtn = page.locator('button[aria-label="Close panel"]');
    if (await closeBtn.count()) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    }
  }
}

// 5) hover delivery framework card
await page.locator("text=Delivery Framework").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const deliveryCard = page.locator("text=Discover").first();
await deliveryCard.hover();
await page.waitForTimeout(500);
await shot("10-delivery-hover-expanded");

// 6) mobile viewport
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${BASE}/our-work`, { waitUntil: "networkidle" });
await page.locator("text=Enterprise Transformation Journey").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await shot("11-mobile-journey");
await page.locator("text=Interactive Architecture Explorer").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await shot("12-mobile-architecture");
// open a node on mobile to check bottom-sheet panel
const mobileFlow = page.locator(".df-arch-flow");
const mobileChip = mobileFlow.locator("button").first();
await mobileChip.click();
await page.waitForTimeout(500);
await shot("13-mobile-panel");

console.log("CONSOLE ERRORS:", JSON.stringify(consoleErrors, null, 2));
console.log("PAGE ERRORS:", JSON.stringify(pageErrors, null, 2));

await browser.close();
