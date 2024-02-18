import express from "express";
import { takeScreenshot } from "./utils/takeScreenshot.mjs";
import { PassThrough } from "stream";
import fs from "node:fs/promises";

const app = express();

const { createServer } = await import("vite");
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  base: "/",
});
app.use(vite.middlewares);

app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace("/", "");
    const render = (await vite.ssrLoadModule("/src/render.jsx")).render;
    const stream = await render(url);

    const passThrough = new PassThrough();
    let htmlContent = "";

    passThrough.on("data", (chunk) => {
      htmlContent += chunk.toString();
    });

    stream.pipe(passThrough);

    // Properly place error handling for the stream
    passThrough.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(500).send("Error processing request");
    });

    passThrough.on("end", async () => {
      if (url === "render") {
        // Process for /render URL
        await takeScreenshot(htmlContent);
        // Response after taking a screenshot
        res.status(200).send("Screenshot taken and saved.");
      } else {
        // Process for rendering page to screen
        let template = await fs.readFile("./index.html", "utf-8");
        template = await vite.transformIndexHtml(url, template);
        // Directly inject htmlContent into the template
        const html = template.replace(`<!--app-html-->`, htmlContent);
        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
