/*----- constants -----*/
const WORD_LIST = ['STARSHIP', 'ASTEROID', 'ORBITAL'];
const MAX_GUESSES = 13;
/*----- state variables -----*/
let hiddenword, guess, wrongLetters;

/*----- cached elements  -----*/
const message = document.querySelector('h2');
const playAgainButton = document.querySelector('#reset-button');
/*----- event listeners -----*/
playAgainButton.addEventListener('click', init);
document.getElementById('keyboard').addEventListener('click', handleGuess);
/*----- functions -----*/
init();

function init() {
    hiddenword = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    guess = '________';
    wrongLetters = [];
    render();
}

function render() {
    handleGuess();
    renderButtons();
    renderMessage();
}

function handleGuess(evt) {
    console.log(guess);
}

function renderButtons() {

}

function renderMessage() {
    
}