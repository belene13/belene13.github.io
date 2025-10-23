let posx;
let posy;
let diam;
let rad;

let velx;
let vely;

function setup() {
  createCanvas(windowWidth, windowHeight);
  diam = random(50, 100)    ;
  rad = diam / 2;

  posx = random(rad, width - rad);
  posy = random(rad, height - rad);

  velx = random(-5, 5);
  vely = random(-5, 5);
}

function draw() {
    background(150);

    if(posx > width - rad || posx < rad){
        velx *= -1;
    }

    if(posy > height - rad || posy < rad){
        vely *= -1;
    }

    posx +=velx;
    posy +=vely;

    circle(posx, posy, diam);
    
}