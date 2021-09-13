//declarations
const cardSuits = ['Spade', 'Heart', 'Club', 'Diamond'];
const cardValue = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const unshuffledDeck = [];
const playerHand = [];
const computerHand = [];

//Dom declarations & listeners
const dealEl = document.querySelector('#dealBtn');
dealEl.addEventListener('click', dealHand);
document.querySelector('#hitBtn').addEventListener('click', hitBtnFn);
document.querySelector('#standBtn').addEventListener('click', standBtnFn);

//create deck
for (let i = 0; i < cardSuits.length; i++){
    for (let x = 0; x < cardValue.length; x++){
        let card = { Value: cardValue[x], Suit: cardSuits[i] }
        unshuffledDeck.push(card)
    }
}

//shuffle deck
const shuffledDeck = unshuffledDeck.sort((a, b) => 0.5 - Math.random())

//deal button function - deal first 2 cards to player, 2 to computer keep 2nd card secret - render?
function dealHand(){
    dealEl.classList.add('inactive');
    playerHand.push(shuffledDeck[0], shuffledDeck[2]);
    computerHand.push(shuffledDeck[1], shuffledDeck[3]);
    gameCheck();
}

//check the initial hand of the players
function gameCheck(){
    
}

// when hit button is pressed increase player hand 
function hitBtnFn(){

}

// when stand button is pressed check computer hand to see if they need to hit or not 
function standBtnFn(){

}

// 