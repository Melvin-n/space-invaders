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
    gameScreen.innerHTML = `<canvas id='canvas' width='500' height='350'></canvas>`
    //start the game, run the startgame function every 10ms i.e game refresh rate
    setInterval(startGame, 10);
    }
})

