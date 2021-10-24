//intiate constants of start menu and canvas
const gameScreen = document.querySelector('#gameScreen')
const colors = document.querySelector('#colors')
const canvas = document.getElementById('canvas')
const colorHeader = document.getElementById('colorHeader')
const colorSelect = document.getElementById('colors')
const ctx = canvas.getContext('2d');
//upon color selection, save the color and change screen to game canvas
colors.addEventListener('click', (e) => {
    if (e.target.id != 'colors') {
    color = e.target.id
    console.log(color)
    canvas.classList.remove('hidden')
    colorHeader.classList.add('hidden')
    colorSelect.classList.add('hidden')

    //start the game, run the startgame function every 10ms i.e game refresh rate
    setInterval(startGame, 20);
    }
})