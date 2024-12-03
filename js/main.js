/*----- constants -----*/
const WORD_LIST = [
    "ASTRONAUT",
    "GALAXY",
    "NEBULA",
    "PLANET",
    "STARS",
    "ORBIT",
    "COSMOS",
    "TELESCOPE",
    "UNIVERSE",
    "COMET",
    "METEOR",
    "ASTEROID",
    "SUPERNOVA",
    "SATELLITE",
    "MOON",
    "SUN",
    "ROCKET",
    "SPACESHIP",
    "GRAVITY",
    "VACUUM",
    "ALIEN",
    "ASTRONOMY",
    "CONSTELLATION",
    "LUNAR",
    "ECLIPSE",
    "AURORA",
    "RADIATION",
    "HABITABLE",
    "INTERSTELLAR",
    "GALACTIC",
    "ASTROPHYSICS",
    "ATMOSPHERE",
    "GRAVITATIONAL",
    "PULSAR",
    "QUASAR",
    "CRATER",
    "ZENITH",
    "EARTH",
    "VENUS",
    "MARS",
    "JUPITER",
    "SATURN",
    "URANUS",
    "NEPTUNE",
    "MERCURY"];
const MAX_WRONG_GUESSES = 6;
/*----- state variables -----*/
let hiddenWord, guess, wrongLetters;

/*----- cached elements  -----*/
const messageEl = document.querySelector('h2');
const keyBoardEl = document.querySelector('#keyboard');
const btns = keyBoardEl.querySelectorAll('button');
const playAgainBtnEl = document.querySelector('#reset-button');
const wordEl = document.querySelector('#word-display');
const imgEl = document.querySelector('img');
const imgBtnEls = [...document.querySelectorAll('#btns-container > button')];
/*----- event listeners -----*/
document.getElementById('btns-container').addEventListener('click', handleBtnClick);
keyBoardEl.addEventListener('click', handleGuess);
playAgainBtnEl.addEventListener('click', init);
/*----- functions -----*/
init();

function init() {
    hiddenWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    guess = '_'.repeat(hiddenWord.length);
    wrongLetters = [];
    render();
}

function render() {
    renderImg();
    renderWord();
    renderButtons();
    renderGameover();
}

function handleBtnClick(evt) {
    const btn = evt.target;
    if (!imgBtnEls.includes(btn)) return;
    wrongLetters.length = parseInt(btn.textContent);
    render();
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

function renderImg() {
    imgEl.src = `imgs/spaceman-${wrongLetters.length}.png`;
    imgBtnEls.forEach(function(btn) {
        btn.disabled = false;
        btn.style.backgroundColor = 'white';
    });
    imgBtnEls[wrongLetters.length].disabled = true;
    imgBtnEls[wrongLetters.length].style.backgroundColor = 'paleblue';
}

function renderWord() {
    wordEl.innerHTML = guess.split('').join(' ');
}

function renderButtons() {
    btns.forEach(btn => {
        const letter = btn.textContent;
        if (guess.includes(letter) || wrongLetters.includes(letter) || guess === hiddenWord || wrongLetters.length >= MAX_WRONG_GUESSES) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });
}

function renderGameover() {
    if (guess === hiddenWord) {
        messageEl.innerText = "Wow, you're an absolute scholar!";
    } else if (wrongLetters.length >= MAX_WRONG_GUESSES) {
        messageEl.innerText = "Read a book, loser!";
    } else {
        messageEl.innerText = `Yo! Choose a letter. ${MAX_WRONG_GUESSES - wrongLetters.length} strikes and you lose.`
    }
}