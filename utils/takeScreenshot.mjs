import puppeteer from "puppeteer";

export async function takeScreenshot(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const outputPath = `./output/screenshot-${Date.now()}.png`;
  await page.screenshot({ path: outputPath });
  await browser.close();
  return outputPath;
}
