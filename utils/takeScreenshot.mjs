import puppeteer from "puppeteer";

export async function takeScreenshot(html) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.addStyleTag({ path: "./src/index.css" });
  const outputPath = `./output/snapshot-lab-1.png`;
  await page.screenshot({ path: outputPath });
  await browser.close();
  return outputPath;
}
