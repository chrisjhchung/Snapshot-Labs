import React from "react";

function Render() {
  const containers = [...Array(100)].map((_, index) => (
    <div key={index} className="container">
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
