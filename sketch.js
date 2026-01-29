let balls = [];
const BALL_COUNT = 60;
const THRESHOLD = 1.15;
const SPEED = 2.2;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < BALL_COUNT; i++) {
    balls.push({
      x: random(width),
      y: random(height),
      vx: random(-SPEED, SPEED),
      vy: random(-SPEED, SPEED),
      r: random(16, 24)
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  loadPixels();

  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 3] = 0;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;

      for (let b of balls) {
        let dx = x - b.x;
        let dy = y - b.y;
        let d = sqrt(dx * dx + dy * dy) || 1;
        sum += (b.r * b.r) / (d * d);
      }

      if (sum > THRESHOLD) {
        let index = 4 * (y * width + x);
        pixels[index] = 255;
        pixels[index + 1] = 60;
        pixels[index + 2] = 120;
        pixels[index + 3] = 255;
      }
    }
  }

  updatePixels();

  for (let b of balls) {
    b.x += b.vx;
    b.y += b.vy;

    if (b.x < 0 || b.x > width) b.vx *= -1;
    if (b.y < 0 || b.y > height) b.vy *= -1;
  }
}
