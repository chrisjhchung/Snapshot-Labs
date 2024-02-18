document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".generate-images");

  button.addEventListener("click", function () {
    generateImages();
  });

  async function generateImages() {
    console.log("clicked");
    const strategy = "css-injection";
    const imageCount = 100;

    try {
      const response = await fetch("http://localhost:3123/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          strategy: strategy,
          count: imageCount,
        }),
      });

      const data = await response.json();
      console.log(data);

      document.querySelector(
        ".number-images"
      ).textContent = `Images Generated: ${data.number}`;
      document.querySelector(
        ".time"
      ).textContent = `Time taken (ms): ${data.duration}`;

      document.querySelector(
        ".memory"
      ).textContent = `Memory Usage (%): ${data.memory}`;
    } catch (error) {
      console.error("Failed to generate images:", error);
    }
  }
});
