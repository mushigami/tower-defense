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

// tile placement
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

// how to draw image from a file
const image = new Image();
image.onload = () => {
  animate();
};
image.src = "img/game-map.png"; // should stay the last

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

// building placement
const buildings = []
let activeTile = undefined;

//animation loop
function animate() {
  requestAnimationFrame(animate); // available via window.xx -> recursive call

  ctx.drawImage(image, 0, 0); // redraw each frame

  enemies.forEach((enemy) => {
    enemy.update();
  });

  placementTiles.forEach((tile) => {
    tile.update(mouse);
  });

  buildings.forEach(building =>{
    building.draw();
    building.projectiles.forEach(projectile =>{
      projectile.update();
    })
  })
}

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener('click', (e)=>{
  if(activeTile && !activeTile.isOccupied){
    buildings.push(new Building({
      position:{
        x:activeTile.position.x,
        y:activeTile.position.y
      }
    }))
    activeTile.isOccupied = true;
  }
  console.log(buildings);
}) // mouse click won't work outside the canvas but inside the window!
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  activeTile = null;
  for(let i = 0; i < placementTiles.length; i++){
    const tile = placementTiles[i];
    if (
      mouse.x > tile.position.x &&
      mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y &&
      mouse.y < tile.position.y + tile.size
    ) {
      activeTile = tile;
      break;
    }
  }
});
