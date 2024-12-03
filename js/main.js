/*----- constants -----*/
const WORD_LIST = ['STARSHIP', 'ASTEROID', 'ORBITAL'];
/*----- state variables -----*/
let hiddenWord, guess, wrongLetters, curFrame;

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
    curFrame = 0;
    hiddenWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    guess = '________';
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
    curFrame = parseInt(btn.textContent);
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
    imgEl.src = `imgs/spaceman-${curFrame}.png`;
    imgBtnEls.forEach(function(btn) {
        btn.disabled = false;
        btn.style.backgroundColor = 'white';
    });
    imgBtnEls[curFrame].disabled = true;
    imgBtnEls[curFrame].style.backgroundColor = 'paleblue';
}

function renderWord() {
    wordEl.innerHTML = guess.split('').join(' ');
}

function renderButtons() {
    btns.forEach(btn => {
        const letter = btn.textContent;
        if (guess.includes(letter) || wrongLetters.includes(letter)) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });
}

function renderGameover() {
    if (guess === hiddenWord) {
        messageEl.innerText = "Wow, you're an absolute scholar!";
    } else if (wrongLetters.length >= 7) {
        messageEl.innerText = "Read a book, bum!";
    } else {
        messageEl.innerText = `Yo! Choose a letter. ${6 - wrongLetters.length} strikes and you're out.`
    }
}