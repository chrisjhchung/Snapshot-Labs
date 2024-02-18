import React, { useState } from "react";
import "../../index.css";

const Home = () => {
  // State hooks for form inputs
  const [imageCount, setImageCount] = useState(100);
  const [strategy, setStrategy] = useState("css-injection");

  const generateImages = async () => {
    console.log("clicked");
    const response = await fetch("http://localhost:3000/render", {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        strategy: strategy,
        count: imageCount,
      }),
    });

    const data = await response.json();
    console.log(data); // Log the response or handle it as needed
  };

  return (
    <div
      style={{
        height: "100svh",
        width: "100vw",
        background: "rgba(10,10,11)",
        color: "rgb(161, 161, 170)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          lineHeight: "1.5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>📸 Snapshot Labs</h1>
        <div className={"containerTop"}>
          <div className={"optionForm"}>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span> Images to generate (n= 1..100)</span>
              <input
                type="number"
                min="1"
                max="100"
                placeholder="100"
                value={imageCount}
                onChange={(e) => setImageCount(e.target.value)}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              <span> Choose strategy</span>
              <select onChange={(e) => setStrategy(e.target.value)}>
                <option value="css-injection">CSS Injection</option>
                <option disabled value="satori">
                  Satori (Not yet implemented)
                </option>
                <option disabled value="client-spa">
                  SPA on client (Not yet implemented)
                </option>
                <option disabled value="pure">
                  Pure HTML, JS, and CSS (Not yet implemented)
                </option>
              </select>
            </label>
            <button
              onClick={() => {
                console.log("hello");
                generateImages();
              }}
            >
              Generate Image
            </button>
          </div>

          <div className="results">
            <div
              style={{
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                lineHeight: "1.75",
              }}
            >
              <p style={{ margin: 0, marginBottom: "1rem", color: "white" }}>
                Results
              </p>
              <p
                style={{ margin: 0, fontSize: "14px" }}
              >{`Images Generated: ${"N/A"}`}</p>
              <p
                style={{ margin: 0, fontSize: "14px" }}
              >{`Time taken (ms): ${"N/A"}`}</p>
              <p
                style={{ margin: 0, fontSize: "14px" }}
              >{`Memory Usage (%): ${"N/A"}`}</p>
            </div>
          </div>
        </div>

        <div
          style={{
            lineHeight: "1.5",
            display: "flex",
            flexDirection: "row",
            gap: "32px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              lineHeight: "1.5",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              textAlign: "justify",
            }}
          >
            <p
              style={{
                margin: 0,
              }}
            >
              Snapshot Labs is a sandbox for testing different webpage
              screenshot capture methods, including Server-Side Rendering (SSR)
              and CSS-only calculations. It ensures accurate representation of
              CSS styles, custom fonts, and dynamic page elements. The platform
              provides a simple API for integration and is designed for
              scalability, capable of generating over 100 images simultaneously,
              catering to developers needing effective screenshot functionality
              in their web projects.
            </p>
            <i>The SPA that should be outputted is displayed on the right</i>
          </div>

          <div
            style={{
              height: "400px",
              flex: 1,
              aspectRatio: "1 / 1",
              background: "rgb(24, 24, 27)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgb(39, 39, 42)",
            }}
          >
            Example goes here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
