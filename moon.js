const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

let manager;
let loadMeSomeImage;
const url = "https://picsum.photos/1000";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

let currentImage = null;

const sketch = ({ context, width, height }) => {
  // for map of pixels
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    if (!currentImage) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, cols, rows);

    typeContext.save();
    typeContext.drawImage(currentImage, 0, 0, cols, rows);
    // typeContext.restore();

    // const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    // context.fillStyle = "black";
    // context.fillRect(0, 0, width, height);

    // for (let i = 0; i < numCells; i++) {
    //   const col = i % cols;
    //   const row = Math.floor(i / cols);

    //   const x = col * cell + random.range(-cell, cell) * 0.5;
    //   const y = row * cell + random.range(-cell, cell) * 0.5;

    //   const r = typeData[i * 4 + 0];
    //   const g = typeData[i * 4 + 1];
    //   const b = typeData[i * 4 + 2];
    //   const a = typeData[i * 4 + 3];

    //   context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`;

    //   context.save();
    //   context.translate(x, y);
    //   context.transform(1, 0.1, 0.8, 0.8, 0, 0);

    //   context.beginPath();
    //   context.arc(0, 0, cell, Math.PI * 1.52, Math.PI * 0.5, true);
    //   context.arc(10, 0, cell, Math.PI * 0.58, Math.PI * 1.4);
    //   context.closePath();
    //   context.fill();

    //   context.restore();
    // context.fillSyle = "black";
    // }
    // this line draws the image obtained from picsum on the top left corner
    context.drawImage(typeCanvas, 0, 0);
  };
};

loadMeSomeImage = (url) => {
  console.log("calls loadmesomeimage");
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
};

const start = async () => {
  try {
    // Load a new image
    currentImage = await loadMeSomeImage(url);
    // Start a new sketch with the updated settings
    manager = await canvasSketch(sketch, settings);
  } catch (err) {
    console.error("Error loading image or starting sketch:", err);
  }
};

// Run the `start` function every 2 seconds to fetch a new image
// not working
//  setInterval(() => {
//   console.log('calls setInterval')
//   loadMeSomeImage(url);
//  }, 2000);

// Start the first sketch
start();
