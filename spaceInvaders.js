
//define players constants
let playerx = 250;
let playery = 295;
let color;

//attack flag checks if bullet is on screen, if set to true, bullet will travel. by is bullet y coordinate, will decrement if attack is true
let attack = false
let by = playery - 38.5
//other consts use by bullet claass constructor
const bulletVelocity = 20;
const bulletWidth = 3
const bulletHeight = 6
let bulletStartY = playery
let bulletStartX = playerx 

let enemyPositionX = 100
let enemyPositionY = 50
//dstart game function, draws the players ship on screen, defines the canvas\

function startGame(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //define player ship class
    
    let playerShip = new Ship(playerx, playery, color);
    playerShip.draw(ctx)
    drawEnemy()
    enemyPositionX += 10

    

    if (pressLeft == true  && playerx >= 25) {
        playerx -= 5
    }
    if (pressRight == true && playerx <=475) {
        playerx += 5
    }
    
    if (pressSpace == true) {
        console.log(enemyArray)

        attack = true
        console.log('shoot')
        let bulletFired = new Bullet(bulletStartX, by, color)
        bulletFired.draw(ctx)
        console.log(by)
        console.log(bulletFired.y)
        
        if (checkHit(bulletFired, enemyArray)) {
            console.log('hittttttttttttttttttttttt')
            bulletFired = null
            attack = false
        } else if (bulletFired.y < 0) {
            attack = false
            console.log(bulletFired)
            bulletFired = null;
        }
    }
        
    if (attack == true){
            by -= 5;
    } else {
        by = playery;
        pressSpace = false
        bulletStartX = playerx 
    }  
    

}

function checkHit(bulletFired, enemyArray) {
    for (let enemy of enemyArray){
        console.log(enemy)
        if (bulletFired.x < enemy.x && bulletFired.x > (enemy.x - 30) && bulletFired.y < (enemy.y) && bulletFired.y > enemy.y - 20) {
            enemy.alive = false
            return true
        }
    }
}
//define player class
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
        ctx.fillStyle = 'black'
        ctx.stroke()
        ctx.closePath()
    }
}
//define bullet class
class Bullet {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        //bulletsAvail.push(this)
    }

    draw(ctx){
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + bulletWidth, this.y)
        ctx.lineTo(this.x + bulletWidth, this.y + bulletHeight)
        ctx.lineTo(this.x, this.y + bulletHeight)
        ctx.lineTo(this.x, this.y)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }
    
}



//movement and bullets. keyhandlers
let pressLeft = false;
let pressRight = false;
let pressSpace =  false
document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)

function keyDownHandler(e) {
    if(e.key == 'ArrowLeft') {
        pressLeft = true
    } else if(e.key == 'ArrowRight') {
        pressRight = true
    } else if(e.key == ' ') {
        pressSpace = true
    }
}

function keyUpHandler(e) {
    if(e.key == 'ArrowLeft') {
        pressLeft = false
    } else if(e.key == 'ArrowRight') {
        pressRight = false
    }
}



class Enemy {
    constructor(x, y, alive){
        this.x = x
        this.y = y
        this.alive = alive
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - 30, this.y)
        ctx.lineTo(this.x - 30, this.y - 20)
        ctx.lineTo(this.x, this.y - 20)
        ctx.lineTo(this.x, this.y)
        ctx.fillStyle = 'purple'
        ctx.fill()
        ctx.fillStyle = 'black'
        ctx.stroke()

    }
}
let enemyArray = []

function createEnemy() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            enemyArray.push(new Enemy(enemyPositionX, enemyPositionY, true))
            enemyPositionX += 80
        }
        enemyPositionX = 100
        enemyPositionY += 30
    }
    //enemyPositionX = 100
}
console.log(enemyArray)
createEnemy()


function drawEnemy() {
    for (let enemy of enemyArray) {
        
        if (enemy.alive) {
            
            enemy.draw(ctx)
        }
    }
    if (enemyArray[0].x < 80) {
        for (let enemy of enemyArray) {
            enemy.x += 200
        } 
    }
    else if (enemyArray[0].x > 79) {
        for (let enemy of enemyArray) {
            enemy.x -= 200
        } 
    }
    
}
