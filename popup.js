const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const growX = document.getElementById('growX');
const growY = document.getElementById('growY');

let width = 400, height = 700;
canvas.width = width;
canvas.height = height;

ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.strokeStyle = 'yellow';

let drawing = false;
let points = [];
let strokes = [];

function resizeAll(w, h) {
  width = w;
  height = h;
  document.documentElement.style.width = w + 'px';
  document.documentElement.style.height = h + 'px';
  document.body.style.width = w + 'px';
  document.body.style.height = h + 'px';
  canvas.width = w;
  canvas.height = h;
  redrawAll();
}

const saved = localStorage.getItem('drawData');
if (saved) {
  strokes = JSON.parse(saved);
  redrawAll();
}

function redrawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const line of strokes) drawLine(line);
}

function drawLine(line) {
  ctx.beginPath();
  ctx.moveTo(line[0].x, line[0].y);
  for (let i = 1; i < line.length - 1; i++) {
    const xc = (line[i].x + line[i + 1].x) / 2;
    const yc = (line[i].y + line[i + 1].y) / 2;
    ctx.quadraticCurveTo(line[i].x, line[i].y, xc, yc);
  }
  ctx.stroke();
}

canvas.addEventListener('pointerdown', (e) => {
  drawing = true;
  points = [{ x: e.offsetX, y: e.offsetY }];
});

canvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  points.push({ x: e.offsetX, y: e.offsetY });
  redrawAll();
  drawLine(points);
});

canvas.addEventListener('pointerup', () => {
  if (points.length > 1) strokes.push([...points]);
  localStorage.setItem('drawData', JSON.stringify(strokes));
  drawing = false;
  points = [];
});

clearBtn.addEventListener('click', () => {
  strokes = [];
  localStorage.removeItem('drawData');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

growX.addEventListener('click', () => {
  resizeAll(width + 100, height);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'yellow';
});

growY.addEventListener('click', () => {
  resizeAll(width, height + 100);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'yellow';
});

shrinkX.addEventListener('click', () => {
  resizeAll(width - 100, height);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'yellow';
});

shrinkY.addEventListener('click', () => {
  resizeAll(width, height - 100);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'yellow';
});

