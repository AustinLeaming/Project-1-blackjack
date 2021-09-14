//constants
const cardSuits = ['Spade', 'Heart', 'Club', 'Diamond'];
const cardValue = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
const unshuffledDeck = [];
const playerHand = [];
const computerHand = [];

//variables 
let nextCardIndex = 4;
let playerScore = 0;
let computerScore = 0;
let newCard = 0;

//Dom declarations
const playerScoreEl = document.querySelector('#playerScore');
const computerScoreEl = document.querySelector('#computerScore');
//button elements & listeners
//deal button
const dealEl = document.querySelector('#dealBtn');
dealEl.addEventListener('click', dealHand);
//hit button
const hitEl = document.querySelector('#hitBtn')
hitEl.addEventListener('click', hitBtnFn);
//stand button
const standEl = document.querySelector('#standBtn')
standEl.addEventListener('click', standBtnFn);

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
    playerHand.push(shuffledDeck[0], shuffledDeck[2]);
    computerHand.push(shuffledDeck[1], shuffledDeck[3]);
    // removeCardFromShuffledDeck();
    getButtonStyles();
    firstHandDealPlayer();
    firstHandDealComputer();
}

// function removeCardFromShuffledDeck(){
//     shuffledDeck.pop(i)
// }

function getButtonStyles(){
    dealEl.classList.add('inactive');
    hitEl.classList.add('hitBtnStyle');
    standEl.classList.add('standBtnStyle');
}

//check the value of the initial player hand
function firstHandDealPlayer(){
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
function firstHandDealComputer(){
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
        renderComputerScore()
    }
}

//display the computer score on screen
function renderComputerScore(){
    computerScoreEl.innerHTML = computerScore
    if (computerScore>21){
        console.log('playerwins')
    }
}

//reveal the second hand of the computer and add the value
function getComputerSecondHand(){
    computerScore = computerHand[1].Value + computerScore;
    console.log('te')
    renderComputerScore();
}

// when hit button is pressed increase player hand by next card in shuffled deck, keep track of index
function hitBtnFn(){
    playerHand.push(shuffledDeck[nextCardIndex]);
    nextCardIndex ++;
    getPlayerScore();
}

function getPlayerScore(){
    newCard = playerHand.length - 1
    if (playerHand[newCard].Value === 'K' || playerHand[newCard].Value === 'Q' || playerHand[newCard].Value === 'J'){
        playerScore = playerScore + 10;
    } else if(playerHand[newCard].Value === 'A'){
        playerScore = playerScore + 11;
    } else{
        playerScore += playerHand[newCard].Value;
    }
    updatePlayerScoreInHTML();
    if (playerScore>21){
        busted();
    }
}

function busted(){
    
    console.log('busted');
}

function updatePlayerScoreInHTML(){
    playerScoreEl.innerHTML = playerScore;
}

// when stand button is pressed check computer hand to see if they need to hit or not 
function standBtnFn(){
    getComputerSecondHand()
}

// 