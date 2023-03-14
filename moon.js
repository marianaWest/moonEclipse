const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

let manager, image;
let loadMeSomeImage;
const url = "https://picsum.photos/1000";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  // for map of pixels
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    context.fillRect(0, 0, cols, rows);

    typeContext.save();
    typeContext.drawImage(image, 0, 0, cols, rows);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell + random.range(-cell, cell) * 0.5;
      const y = row * cell + random.range(-cell, cell) * 0.5;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;

      context.save();
      context.translate(x, y);
      context.transform(1, 0.1, 0.8, 0.8, 0, 0);

      context.beginPath();
      context.arc(0, 0, cell, Math.PI * 1.52, Math.PI * 0.5, true);
      context.arc(10, 0, cell, Math.PI * 0.58, Math.PI * 1.4);
      context.closePath();
      context.fill();

      context.restore();
    }
    // context.drawImage(typeCanvas, 0, 0);
  };
};

loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  const url = "https://picsum.photos/1000";
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};

start();
