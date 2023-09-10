const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 768;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// convert 1D array to 2D array
const placementTilesData2D = [];
for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20));
}

// building placement
class PlacementTile {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 64;
    this.color = 'lime';
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}

const placementTiles = [];
placementTilesData2D.forEach((row, y) => {
  // y is the index of the row
  row.forEach((symbol, x) => {
    // x is the index of the column
    if (symbol === 14) {
      // add a building placement tile
      placementTiles.push(
        new PlacementTile({
          position: {
            x: x * 64,
            y: y * 64,
          },
        })
      );
    }
  });
});
console.log(placementTiles);

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
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
  }

  // class draw method
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    if (
      Math.round(this.center.x) == Math.round(waypoint.x) &&
      Math.round(this.center.y) === Math.round(waypoint.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}

// spawn enemies within an array
const enemies = [];
for (let i = 1; i <= 10; i++) {
  const xOffset = i * 150;
  enemies.push(
    new Enemy({
      position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
    })
  );
}

//animation loop
function animate() {
  requestAnimationFrame(animate); // available via window.xx -> recursive call

  ctx.drawImage(image, 0, 0); // redraw each frame

  enemies.forEach((enemy) => {
    enemy.update();
  });

  placementTiles.forEach(tile =>{
    tile.draw();
  })
}
