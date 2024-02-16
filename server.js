import express from "express";
import { takeScreenshot } from "./utils/takeScreenshot.mjs";
import { collectStreamData } from "./utils/collectStreamData.mjs";

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
    const htmlContent = await collectStreamData(stream);

    console.log("htmlContent", htmlContent);

    // Take a screenshot and save it
    const screenshotPath = await takeScreenshot(htmlContent);

    res.status(200).send(`Screenshot taken and saved at ${screenshotPath}`);
  } catch (e) {
    console.log(e);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`);
});
