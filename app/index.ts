import { createCanvas } from 'canvas';
import fs from 'fs';

const lineLength = 20;
const gap = lineLength * 20;
const degreesGap = 0.5;

const size = gap * Math.ceil(Math.sqrt(180 / degreesGap)) + gap;

function getPositionFronDegree(x: number, y: number, degrees: number, distance: number): { x: number; y: number } {
  return {
    x: x + distance * Math.sin((degrees * Math.PI) / 180),
    y: y + distance * Math.cos((degrees * Math.PI) / 180),
  };
}

(() => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  let degrees = 0;
  let startX = 0;
  let startY = gap;

  const pi = String(Math.PI).replace('.', '').split('');

  do {
    degrees += degreesGap;
    startX += gap;

    if (startX > size - gap) {
      startX = gap;
      startY += gap;
    }

    let [x, y] = [startX, startY];

    ctx.font = `900 ${lineLength * 4}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#eee';
    ctx.fillText(String(degrees), x, y);

    ctx.beginPath();

    ctx.moveTo(x, y);

    let lastDegree = 0;
    pi.forEach((n) => {
      const d = parseInt(n) * degrees - lastDegree;
      const position = getPositionFronDegree(x, y, d, lineLength);
      [x, y] = [position.x, position.y];
      lastDegree = 0;
      ctx.lineTo(x, y);
    });

    ctx.stroke();
  } while (degrees < 180);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`./pi/pi.0.png`, buffer);
})();
