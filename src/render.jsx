// Assuming this is in your "render.jsx" or equivalent file
import { renderToPipeableStream } from "react-dom/server";
import React from "react";
import App from "./App";

export function render(url) {
  return new Promise((resolve, reject) => {
    const stream = renderToPipeableStream(<App url={url} />, {
      onShellReady: () => {
        resolve(stream);
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
}
