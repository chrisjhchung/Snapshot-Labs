import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";

export function render() {
  return new Promise((resolve, reject) => {
    const stream = renderToPipeableStream(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      {
        onShellReady: () => {
          resolve(stream);
        },
        onShellError: (err) => {
          reject(err);
        },
      }
    );
  });
}
