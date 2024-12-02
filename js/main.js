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
    messageEl.innerText = "Yo! Choose a letter."
    render();
}

function render() {
    renderWord();
    renderButtons();
    renderMessage();
}

function renderWord() {
    wordEl.innerHTML = guess.split('').join(' ');
}

function handleGuess(evt) {
    if (evt.target.tagName !== 'BUTTON') return;
    const letter = evt.target.textContent;
    if (hiddenWord.includes(letter)) {
        let updatedGuess = '';
        for (let i = 0; i < hiddenWord.length; i++) {
            updatedGuess += hiddenWord[i] === letter ? letter : guess[i];
        }
        guess = updatedGuess;
        } else {
            wrongLetters.push(letter);
        }
    render();
}

function renderButtons() {
 
}

function renderMessage() {
    if (guess === hiddenWord) {
        messageEl.innerText = "Wow, you're an absolute scholar!";
    } else if (wrongLetters.length >= 5) {
        messageEl.innerText = "Read a book, bum!";
    }
}