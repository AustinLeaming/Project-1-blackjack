//constants
const cardSuits = ['Spade', 'Heart', 'Club', 'Diamond'];
const cardValue = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
const unshuffledDeck = [];
const playerHand = [];
const computerHand = [];

//variables to 
let playerScore = 0;
let computerScore = 0;

//Dom declarations & listeners
const playerScoreEl = document.querySelector('#playerScore');
const computerScoreEl = document.querySelector('#computerScore');
const dealEl = document.querySelector('#dealBtn');
dealEl.addEventListener('click', dealHand);
const hitEl = document.querySelector('#hitBtn')
hitEl.addEventListener('click', hitBtnFn);
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
    playerHandCheck();
    computerHandCheck();
}

//check the value of the initial player hand
function playerHandCheck(){
    for (let i = 0; i < playerHand.length; i++){
        if (playerHand[i].Value === 'K' || playerHand[i].Value === 'Q' || playerHand[i].Value === 'J'){
            console.log(playerHand[i].Value, 'player hand')
            playerScore = playerScore + 10;
        } else if (playerHand[i].Value ==='A'){
            console.log(playerHand[i].Value, 'player hand')
            playerScore = playerScore + 11;
        } else {
            console.log(playerHand[i].Value, 'player hand')
            playerScore = playerHand[i].Value + playerScore;
        }
        playerScoreEl.innerHTML = playerScore
    }

}

//check the value of the initial comptuer hand
function computerHandCheck(){
    for (let i = 0; i < 1; i++){
        if (computerHand[i].Value === 'K' || computerHand[i].Value === 'Q' || computerHand[i].Value === 'J'){
            console.log(computerHand[i].Value, 'computer hand')
            computerScore = computerScore + 10;
        } else if (computerHand[i].Value ==='A'){
            console.log(computerHand[i].Value, 'computer hand')
            computerScore = computerScore + 11;
        } else {
            console.log(computerHand[i].Value, 'computer hand')
            computerScore = computerHand[i].Value + computerScore;
        }
        computerScoreEl.innerHTML = computerScore
    }
}

// when hit button is pressed increase player hand 
function hitBtnFn(){

}

// when stand button is pressed check computer hand to see if they need to hit or not 
function standBtnFn(){

}

// 