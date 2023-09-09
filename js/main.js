const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 768;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// how to draw image from a file
const image = new Image();
image.onload = () => {
  animate();
};
image.src = "img/game-map.png"; // should stay the last

class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    // this.position = {
    //     x: 0,
    //     y: 0,
    // }
    this.width = 100;
    this.height = 100;
    this.waypointIndex = 0;
  }

  // class draw method
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.position.y;
    const xDistance = waypoint.x - this.position.x;
    const angle = Math.atan2(yDistance, xDistance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);

    if (
      Math.round(this.position.x) == Math.round(waypoint.x) &&
      Math.round(this.position.y) === Math.round(waypoint.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}

const enemy = new Enemy({ position: { x: waypoints[0].x, y: waypoints[0].y } });
const enemy2 = new Enemy({ position: { x: waypoints[0].x-150, y: waypoints[0].y } });

//animation loop
function animate() {
  requestAnimationFrame(animate); // available via window.xx -> recursive call

  ctx.drawImage(image, 0, 0); // redraw each frame
  enemy.update();
  enemy2.update();
}
