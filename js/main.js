/*----- constants -----*/
const WORD_LIST = ['STARSHIP', 'ASTEROID', 'ORBITAL'];

/*----- state variables -----*/
let word, guessesRemaining, winner;

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
initialize();

function initialize() {
    word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    guessesRemaining = 12;
    winner = null;
    render();
}

function render() {
    
}