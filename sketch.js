let stars = [];
let t = 0;

function setup() {
  pixelDensity(1);
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
noCursor();
 
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      r: random(1.5, 3),
      twinkle: random(TWO_PI)
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  drawStars();
  drawStarCursor(mouseX, mouseY);

  t += 0.01;
}

function drawStars() {
  for (let s of stars) {
    let alpha = map(
      sin(frameCount * 0.20 + s.twinkle),
      -1, 1,
      80, 200
    );
    fill(255, alpha);
    circle(s.x, s.y, s.r);
  }
}

function drawStarCursor(x, y) {
  push();
  translate(x, y);
  rotate(t * 1.5);
  noStroke();

  let points = 8;
  let innerR = 14;
  let outerR = 38;


  let hueValue = (frameCount * 1.5) % 360;

  for (let i = 3; i >= 1; i--) {
    let glowOuter = outerR + i * 12;
    let glowInner = innerR + i * 6;

    fill(hueValue, 70, 90, 20); 

    beginShape();
    for (let j = 0; j < points * 2; j++) {
      let angle = PI * j / points;
      let r = j % 2 === 0 ? glowOuter : glowInner;
      vertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
  }

  fill(hueValue, 80, 100, 90);

  beginShape();
  for (let i = 0; i < points * 2; i++) {
    let angle = PI * i / points;
    let r = i % 2 === 0 ? outerR : innerR;
    vertex(cos(angle) * r, sin(angle) * r);
  }
  endShape(CLOSE);

  pop();
}
