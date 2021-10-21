//define the users color choice
let color;

//define canvas/gamescreen
const gameScreen = document.querySelector('#gameScreen')
const colors = document.querySelector('#colors')


//upon color selection, save the color and change screen to game canvas
colors.addEventListener('click', (e) => {
    if (e.target.id != 'colors') {
    color = e.target.id
    console.log(color)
    gameScreen.innerHTML = `<canvas id='canvas' width='500' height='350'>Pong?</canvas>`
    startGame();
    }
})
//define start game function, draws the players ship on screen, defines the canvas\
//have to do in seperate function otherwise it initiates before color is set from addeventlistener
//called inside eventlistener after color is selected

function startGame(){
    //define canvas
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    //define player ship class
    class Ship {
        constructor(x, y, color) {
            this.y = y;
            this.x = x;
            this.color = color
        }
        draw(context){
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
            // ctx.lineTo(this.x - 20, this.y - 15)
            ctx.lineTo(this.x, this.y)
            ctx.fillStyle = color
            ctx.fill();
        }
    }

    let playerShip = new Ship(250, 250, color);
    playerShip.draw(ctx)
}