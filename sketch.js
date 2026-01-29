const cursor = document.getElementById("cursor-follower");

let mouseX = 0, mouseY = 0;
let x = 0, y = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  x += (mouseX - x) * 0.15;
  y += (mouseY - y) * 0.15;

  cursor.style.left = x + "px";
  cursor.style.top = y + "px";

  requestAnimationFrame(animate);
}

animate();
