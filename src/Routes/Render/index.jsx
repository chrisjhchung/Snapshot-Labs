import React from "react";
import "./index.css";

function Render({ numberOfImages, height, width }) {
  const containers = [...Array(numberOfImages || 100)].map((_, index) => (
    <div key={index} style={{ height, width }} className="render-container">
      <p>Container {index + 1}</p>
      <p>Snapshot Labs</p>
      <p>This is a super simple example of using SSR with CSS and flex boxes</p>
      <p>Also demonstrates importing fonts</p>
      <div className="height"></div>
    </div>
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{containers}</div>
  );
}

export default Render;
