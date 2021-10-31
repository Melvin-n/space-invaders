
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

const enemySpeed = 1
const enemyRows = 4
const enemyCols = 1 
//dstart game function, draws the players ship on screen, defines the canvas\

function startGame(){
    //clear the screen every startgame interval
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //define player ship class
    
    //define new instance of Ship class - this will be the players ship
    let playerShip = new Ship(playerx, playery, color);
    //call playership.draw and drawenemy to draw enemys and player on screen
    playerShip.draw(ctx)
    drawEnemy()    

    //check for player movement flags. these functions have been called outside startGame as calling inside results in multiple presses at once
    if (pressLeft == true  && playerx >= 25) {
        playerx -= 5
    }
    if (pressRight == true && playerx <=475) {
        playerx += 5
    }
    //similair, to movement, check for attack function initiated when spacebar pressdown is true
    if (pressSpace == true) {
        //change attack to true, this will initiate bullets movement
        attack = true
        //create new bullet (only one bullet can be on the screen at a time)
        let bulletFired = new Bullet(bulletStartX, by)
        bulletFired.draw(ctx)
        
        //check for a collision between bullet and enemy. if so, remove the bullet
        if (checkHit(bulletFired, enemyArray)) {
            bulletFired = null
            attack = false
        } else if (bulletFired.y < 0) {
            //if bullet reaches top of screen, also delete it
            attack = false
            bulletFired = null;
        }
    }
    //while attack is true, move the bullets y position by 5 each interval. else reset position back to default
    if (attack == true){
            by -= 5;
    } else {
        by = playery;
        pressSpace = false
        bulletStartX = playerx 
    }  
    //check position of enemy for lose condition
    for (let enemy of enemyArray) {
        if (enemy.y > 230) {
            gameOverLose()
        } 
    }
    //check amount of enemys on screen for win condition
    if (enemyArray.length == 0){
        gameOverWin()
    }
}

//check hit will check if the bullet is in the same x, y coordinates as an enemy ship
function checkHit(bulletFired, enemyArray) {
    for (let enemy of enemyArray){
        console.log(enemy)
        if (bulletFired.x < enemy.x && bulletFired.x > (enemy.x - 30) && bulletFired.y < (enemy.y) && bulletFired.y > enemy.y - 20) {
            enemy.alive = false
            return true
        }
    }
    
    
}
//define player class, passing coordinates and color
class Ship {
    constructor(x, y, color) {
        this.y = y;
        this.x = x;
        this.color = color
    }
    //ship drawing
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
        ctx.strokeStyle = 'black'
        ctx.stroke()
        ctx.closePath()
    }
}
//define bullet class, passing coordinates 
class Bullet {
    constructor(x, y) {
        this.x = x
        this.y = y
 
    }
    
    //bullet class
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

setInterval(movement, 200)


//movement and bullets. keyhandlers
let pressLeft = false;
let pressRight = false;
let pressSpace =  false
document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)

//use boolean flags to check for key presses. if the key is pressed, the flag is true, when its let go, returns to false
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


//define enemy class, passing in coordinates and alive bool flag
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
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.strokeStyle = 'green'
        ctx.stroke()

    }
}
//define enemy array to hold all the current enemies on screen
let enemyArray = []

//create enemy function, pushes each enemy into array using a loop, each enemies position changes from the previous 
function createEnemy() {
    for (let i = 0; i < enemyRows; i++) {
        for (let j = 0; j < enemyCols; j++) {
            enemyArray.push(new Enemy(enemyPositionX, enemyPositionY, true))
            enemyPositionX += 65
        }
        enemyPositionY += 30
        enemyPositionX = 100

    }
}

//create enemies
createEnemy()

//draw the enemies if their alive status is true, else if it's false, remove them from the array
function drawEnemy() {
    for (let enemy of enemyArray) {       
        if (enemy.alive) {          
            enemy.draw(ctx)
        } else {
            enemyArray.splice(enemyArray.indexOf(enemy), 1)
        }
    }   
}

//move the enemies along y axis
function movement() {
    for (let enemy of enemyArray){
        enemy.y += enemySpeed
    }
 
}

//change display screen for win or loss
let gameOverLose = () => {
    gameScreen.innerHTML = `
    <h1> You lose! </h1>
    <h3> The aliens have invaded.... </h3>
    `
    
}

let gameOverWin = () => {
    gameScreen.innerHTML = `
    <h1> You win! </h1>
    <h3> You defeated the aliens, your planet is safe.... for now. </h3>
    `
}