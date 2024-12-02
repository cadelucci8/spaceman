/*----- constants -----*/
const WORD_LIST = ['STARSHIP', 'ASTEROID', 'ORBITAL'];
/*----- state variables -----*/
let hiddenWord, guess, wrongLetters;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h2');
const keyBoardEl = document.querySelector('#keyboard');
const playAgainBtnEl = document.querySelector('#reset-button');
const wordEl = document.querySelector('#word-display');
const spacemanImageEl = document.querySelector('#spaceman');
/*----- event listeners -----*/
keyBoardEl.addEventListener('click', handleGuess);
playAgainBtnEl.addEventListener('click', init);
/*----- functions -----*/
init();

function init() {
    hiddenWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    guess = '________';
    wrongLetters = [];
    render();
}

function render() {
    renderWord();
    handleGuess();
    renderButtons();
    renderMessage();
}

function renderWord() {
    wordEl.innerHTML = guess.split('').join(' ');
}

function handleGuess(evt) {
    
}

function renderButtons() {
 
}

function renderMessage() {
    
}