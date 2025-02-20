document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }

  resizeCanvas();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
  const fontSize = 16;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = new Array(columns).fill(1);

  function drawMatrix() {
      ctx.fillStyle = "rgba(23, 24, 16, 0.05)"; // Dark fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#03fa6e"; // Green neon text
      ctx.font = `${fontSize}px Arial`;

      for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
          }

          drops[i]++;
      }

      requestAnimationFrame(drawMatrix);
  }

  window.addEventListener("resize", () => {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
  });

  drawMatrix();
});
