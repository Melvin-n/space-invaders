
//define players constants
let playerx = 250;
let playery = 295;



//define start game function, draws the players ship on screen, defines the canvas\
//have to do in seperate function otherwise it initiates before color is set from addeventlistener
//called inside eventlistener after color is selected


function startGame(){
    //define canvas
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    //clear the rect each time function is loaded (each interval)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //define player ship class
    class Ship {
        constructor(x, y, color) {
            this.y = y;
            this.x = x;
            this.color = color
        }
        //draw the ship
        draw(ctx){
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x + 10, this.y + 7.5)
            ctx.lineTo(this.x + 10, this.y + 28.5)
            ctx.lineTo(this.x + 25, this.y + 38.5)
            ctx.lineTo(this.x + 10, this.y + 38.5)
            ctx.lineTo(this.x + 10, this.y + 38.5)
            ctx.lineTo(this.x + 10, this.y + 48.5)
            ctx.lineTo(this.x - 10, this.y + 48.5)
            ctx.lineTo(this.x - 10, this.y + 38.5)
            ctx.lineTo(this.x - 25, this.y + 38.5)
            ctx.lineTo(this.x - 10, this.y + 28.5)
            ctx.lineTo(this.x - 10, this.y + 7.5)
            ctx.lineTo(this.x, this.y)
            ctx.fillStyle = color
            ctx.fill();
            ctx.closePath()
        }
    }
    let playerShip = new Ship(playerx, playery, color);
    playerShip.draw(ctx)
    
   
    document.addEventListener('keyown', playerShoot) 
    function playerShoot(e) {
        console.log(e)    
        if (e.key == ' ') {
            shootBullet(ctx)
        }
    }

}
//define bullet speed
const bulletVelocity = 20;
const bulletStartY = playery - 38.5
const bulletStartX = playerx 
const bulletWidth = 3
const bulletHeight = 6
//call function upon spacebar press



//shoot function
function shootBullet(ctx) {
    class Bullet {
        constructor(x, y, color) {
            x = this.x
            y = this.y
            color = this.color
        }
    
        draw(ctx){
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x + bulletWidth, this.y)
            ctx.lineTo(this.x + bulletWidth, this.y + bulletHeight)
            ctx.lineTo(this.x, this.y + bulletHeight)
            ctx.lineTo(this.x, this.y)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.closePath()
        }
    }

    let playerBullet = new Bullet(bulletStartX,bulletStartY, color) 
    playerBullet.draw(ctx)
    
}

    


//define players movement with arrow keys
const speed = 10;
document.addEventListener('keydown', playerMovement)

function playerMovement(e) { 
        if (e.key == 'ArrowLeft' && playerx >= 25) {
            playerx -= speed;
            console.log(playerx)
            
        } else if (e.key == 'ArrowRight' && playerx <= 475) {
            playerx += speed;
            console.log(playerx)
        }
}

//player shoot function






