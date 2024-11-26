/*----- constants -----*/
const WORD_LIST = ['STARSHIP', 'ASTEROID', 'ORBITAL'];

/*----- state variables -----*/
let Hiddenword, guessesRemaining, guessedLetters, incorrectLetters;

/*----- cached elements  -----*/
const message = document.querySelector('h2');
const playAgainButton = document.querySelector('#reset-button');
guessesRemaining = document.querySelector('p-gusses');
/*----- event listeners -----*/
playAgainButton.addEventListener('click', init);
document.getElementById('board').addEventListener('click', handleGuess);
/*----- functions -----*/
init();

function init() {
    Hiddenword = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    guessesRemaining = 12;
    guessedLetters = [];
    incorrectLetters = [];
    render();
}

function render() {
    handleGuess();
    renderButtons();
    renderMessage();
}

function handleGuess(evt) {
    return guessesRemaining -= 1;
}

function renderButtons() {

}

function renderMessage() {

}