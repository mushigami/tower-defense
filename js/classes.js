class PlacementTile {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 64;
    this.color = "rgba(255,255,255,0.15)";
    this.isOccupied = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
  update(mouse) {
    this.draw();
    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      this.color = "white";
    } else {
      this.color = "rgba(255,255,255,0.15)";
    }
  }
}

class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
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

class Projectile {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
  }

  update(){
    this.draw();

    const angle = Math.atan2(
      enemies[0].position.y - this.position.y, 
      enemies[0].position.x - this.position.x);

      this.velocity.x = Math.cos(angle);
      this.velocity.y = Math.sin(angle);

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  }
}

class Building {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 128;
    this.height = 64;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.projectiles = [
      new Projectile({
        position: {
          x: this.center.x,
          y: this.center.y,
        },
      }),
    ];
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, 64);
  }
}
