
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 768;

ctx.fillStyle = "white"
ctx.fillRect(0,0, canvas.width, canvas.height)

// how to draw image from a file
const image = new Image()
image.onload = () =>{
    animate();
}
image.src = 'img/game-map.png'; // should stay the last


class Enemy {
    constructor({position = {x:0, y:0}}){
        this.position = position;
        // this.position = {
        //     x: 0,
        //     y: 0,
        // }
        this.width = 100;
        this.height = 100;
    }

    // class draw method
    draw(){
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        this.position.x += 1;
    }
}

const enemy = new Enemy({position : {x: 200, y:400}});
const enemy2 = new Enemy({position : {x: 0, y:400}});


//animation loop
function animate(){
    requestAnimationFrame(animate) // available via window.xx -> recursive call
    
    
    ctx.drawImage( image, 0, 0); // redraw each frame
    enemy.update();
    enemy2.update();

}

