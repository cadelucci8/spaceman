/*----- constants -----*/
const BACKGROUND_AUDIO = new Audio('assets/audio/space-72679.mp3');
const WINNING_AUDIO = new Audio('assets/audio/relaxing-guitar-loop-v5-245859.mp3');
const RIGHT_GUESS_AUDIO = new Audio('assets/audio/wrong-answer-129254.mp3');
const WRONG_GUESS_AUDIO = new Audio('assets/audio/error-4-199275.mp3');
const LAST_STRIKE_AUDIO = new Audio('assets/audio/sci-fi-sound-effect-designed-circuits-hum-10-200831.mp3');
const PLAY_AGAIN_AUDIO = new Audio('assets/audio/glitch-sound-232391.mp3');
const LOSING_AUDIO = new Audio('assets/audio/game-over-transition-fx-178632.mp3');
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
let hiddenWord, guess, wrongLetters, lastStrikePlayed;

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
    lastStrikePlayed = false;
    LAST_STRIKE_AUDIO.pause();
    WINNING_AUDIO.pause();
    LOSING_AUDIO.pause();
    BACKGROUND_AUDIO.currentTime = 0;
    PLAY_AGAIN_AUDIO.currentTime = 0;
    PLAY_AGAIN_AUDIO.volume = .01;
    PLAY_AGAIN_AUDIO.play();
    render();
}

function render() {
    renderBackGroundAudio();
    renderImg();
    renderWord();
    renderButtons();
    renderLastStrikeAudio();
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
            if (hiddenWord[i] === letter) {
                updatedGuess += hiddenWord[i]
                PLAY_AGAIN_AUDIO.pause();
                LAST_STRIKE_AUDIO.pause();
                RIGHT_GUESS_AUDIO.currentTime = 0;
                RIGHT_GUESS_AUDIO.volume = .02;
                RIGHT_GUESS_AUDIO.play();
            } else {
                updatedGuess += guess[i];
            }
        }
        guess = updatedGuess;
    } else {
        wrongLetters.push(letter);
        PLAY_AGAIN_AUDIO.pause();
        LAST_STRIKE_AUDIO.pause();
        WRONG_GUESS_AUDIO.currentTime = 0;
        WRONG_GUESS_AUDIO.volume = .03;
        WRONG_GUESS_AUDIO.play();
    }
    render();
}

function renderBackGroundAudio() {
    BACKGROUND_AUDIO.loop = true;
    BACKGROUND_AUDIO.volume = 0.01;
    BACKGROUND_AUDIO.play();
}

function renderImg() {
    imgEl.src = `assets/imgs/spaceman-${wrongLetters.length}.png`;
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

function renderLastStrikeAudio() {
    if (wrongLetters.length === 5 && !lastStrikePlayed) {
        RIGHT_GUESS_AUDIO.pause();
        WRONG_GUESS_AUDIO.pause();
        LAST_STRIKE_AUDIO.currentTime = 2;
        LAST_STRIKE_AUDIO.volume = .04;
        LAST_STRIKE_AUDIO.play();
        lastStrikePlayed = true;
    } else return;
}

function renderGameover() {
    if (guess === hiddenWord) {
        messageEl.innerText = "Wow, you're an absolute scholar!";
        BACKGROUND_AUDIO.pause();
        LAST_STRIKE_AUDIO.pause();
        RIGHT_GUESS_AUDIO.pause();
        WRONG_GUESS_AUDIO.pause();
        WINNING_AUDIO.currentTime = 9.75;
        WINNING_AUDIO.volume = .02;
        WINNING_AUDIO.play();
    } else if (wrongLetters.length >= MAX_WRONG_GUESSES) {
        messageEl.innerText = "Read a book, loser!";
        BACKGROUND_AUDIO.pause();
        LAST_STRIKE_AUDIO.pause();
        RIGHT_GUESS_AUDIO.pause();
        WRONG_GUESS_AUDIO.pause();
        LOSING_AUDIO.currentTime = 0;
        LOSING_AUDIO.volume = .07;
        LOSING_AUDIO.play();
    } else if (wrongLetters.length === 5) {
        messageEl.innerText = "You're on your last strike. No pressure."
    } else {
        messageEl.innerText = `Yo! Choose a letter. ${MAX_WRONG_GUESSES - wrongLetters.length} strikes and you lose.`
    }
}