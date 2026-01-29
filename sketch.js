let stars = [];
let t = 0;

function setup() {
  pixelDensity(1);
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');
  noStroke();


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
  drawBlob(mouseX, mouseY);
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

function drawBlob(x, y) {
  push();
  translate(x, y);

  let layers = [
    color(120, 200, 255, 80),
    color(180, 120, 255, 70),
    color(255, 120, 200, 60),
    color(120, 255, 200, 60)
  ];

  for (let i = 0; i < layers.length; i++) {
    fill(layers[i]);
    beginShape();

    let points = 12;
    let radius = 20 + i * 6; // 

    for (let a = 0; a < TWO_PI; a += TWO_PI / points) {
      let noiseVal = noise(
        cos(a) + 1 + i * 10,
        sin(a) + 1 + t
      );

      let r = radius + noiseVal * 10; // 
      let px = cos(a) * r;
      let py = sin(a) * r;
      curveVertex(px, py);
    }

    endShape(CLOSE);
  }

  pop();
}
