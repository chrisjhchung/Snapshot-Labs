// Assuming this is in your "render.jsx" or equivalent file
import { renderToPipeableStream } from "react-dom/server";
import React from "react";
import Render from "./Routes/Render";
import Home from "./Routes/Home";

export function render(url) {
  const routes = {
    render: <Render />,
  };
  return new Promise((resolve, reject) => {
    const stream = renderToPipeableStream(routes?.[url] || <Home />, {
      onShellReady: () => {
        resolve(stream);
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
}
