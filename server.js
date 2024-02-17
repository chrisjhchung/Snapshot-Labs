import express from "express";
import { takeScreenshot } from "./utils/takeScreenshot.mjs";
import { PassThrough } from "stream";

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

    passThrough.on("end", async () => {
      // Start time
      const startTime = Date.now();

      // Take a screenshot and save it
      await takeScreenshot(htmlContent);

      // End time
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(
        `Screenshot taken and saved at outputs/*.\nTime taken: ${duration} ms\n`
      );

      res
        .status(200)
        .send(
          `Screenshot taken and saved at outputs/*.\nTime taken: ${duration} ms\n`
        );
    });

    passThrough.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(500).send("Error processing request");
    });
  } catch (e) {
    console.log(e);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
