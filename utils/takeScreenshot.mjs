import puppeteer from "puppeteer";
import sharp from "sharp";

export async function takeScreenshot(html) {
  const initialMemoryUsage = process.memoryUsage();
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
  const startTime = Date.now();

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ path: "./src/Routes/Render/index.css" });

  await page.evaluate(() => {
    function calcHeight(containerClassName) {
      const containers = document.getElementsByClassName(containerClassName);
      Array.from(containers).forEach((container) => {
        const containerHeight = container.clientHeight;
        const heightDiv = container.querySelector(".height");
        const paragraph = document.createElement("p");
        paragraph.textContent = `Height: ${containerHeight}px`;
        heightDiv.appendChild(paragraph);
      });
    }
    calcHeight("render-container");
  });

  const outputPath = `./output/fullpage-snapshot.png`;
  await page.screenshot({
    path: outputPath,
    fullPage: true,
    optimizeForSpeed: true,
  });
  const endTime = Date.now();

  await browser.close();

  const imageHeight = 500;
  const tasks = [];
  for (let i = 0; i < 100; i++) {
    const outputPartPath = `./output/snapshot-part-${i + 1}.png`;
    const task = sharp(outputPath)
      .extract({
        left: 0,
        top: i * imageHeight,
        width: 500,
        height: imageHeight,
      })
      .toFile(outputPartPath);

    tasks.push(task);
  }

  await Promise.all(tasks);

  const finalMemoryUsage = process.memoryUsage();
  const memoryPercentageChange =
    ((finalMemoryUsage.heapUsed - initialMemoryUsage.heapUsed) /
      initialMemoryUsage.heapUsed) *
    100;

  // End time
  const duration = endTime - startTime;
  console.log("\nCreating 100 images...");
  console.log("Duration (Excluding pupeeter cold start): ", duration);
  console.log("Memory Usage Increase (bytes): ", memoryPercentageChange);

  return {
    number: 100,
    duration: duration,
    memory: memoryPercentageChange,
  };
}
