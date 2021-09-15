//constants
const cardSuits = ['Spade', 'Heart', 'Club', 'Diamond'];
const cardValue = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
const unshuffledDeck = [];
const playerHand = [];
const computerHand = [];

//variables 
let nextCardIndex = 0;
let playerScore = 0;
let computerScore = 0;
let newPlayerCard = 0;
let newComputerCard = 0;
let shuffledDeck = [];

//Dom declarations
const playerScoreEl = document.querySelector('#playerScore');
const computerScoreEl = document.querySelector('#computerScore');

//button elements & listeners
//deal button
const dealEl = document.querySelector('#dealBtn');
dealEl.addEventListener('click', dealBtnFn);
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
function shuffleCards(){
    shuffledDeck = unshuffledDeck.sort((a, b) => 0.5 - Math.random())
}

//deal button function - deal first 2 cards to player, 2 to computer keep 2nd card secret - render?
function dealBtnFn(){
    shuffleCards();
    passFirstRoundHand();
    getButtonStyles();
}

//set styles for buttons once deal button is pressed
function getButtonStyles(){
    dealEl.classList.add('inactive');
    hitEl.classList.add('hitBtnStyle');
    standEl.classList.add('standBtnStyle');
}

// function resetBtns(){
//     dealEl.classList.remove('inactive');
//     dealEl.classList.add('active');
//     hitEl.classList.remove('hitBtnStyle');
//     hitEl.classList.add('inactive');
//     standEl.classList.remove('standBtnStyle');
//     standEl.classList.add('inactive');
// }

//keeps track of which card to pull out of the shuffled deck, once it hits 52 run the function to reset
function increaseNextCardIndex(){
    nextCardIndex++
    //check to see if cards are running out
    checkRemainingCards();
}

//if the index for picking cards exceeds the amount of cards, reset the index
function checkRemainingCards(){
    if(nextCardIndex > 52){
        resetDeck();
    }
}

//reshuffle the deck and set the index for choosing cards to 0
function resetDeck(){
    nextCardIndex=0;
    shuffleCards();
}

//start off by giving the player the first card in the deck
//calculate the value of that card
//increase the index to pick the card
//go to the function to pass the computer card
function passFirstRoundHand(){
    while(playerHand.length<2){
        playerHand.push(shuffledDeck[nextCardIndex]);
        getPlayerScore();
        increaseNextCardIndex();
        passComputerHand();
        if(playerScore==21){
            setPlayerWinner();
        }
    }   
}

//player win function
function setPlayerWinner(){
    console.log('win')
}

//pass the 2nd card in the index to the computer
//increase the counter index for picking cardds
//pass the index back to the player so they can get the 3rd card
//calculate the score of the computers hand
function passComputerHand(){
    computerHand.push(shuffledDeck[nextCardIndex])
    renderComputerScore();
    increaseNextCardIndex();
    passFirstRoundHand();
}

//calculates the player score
function getPlayerScore(){
    newPlayerCard = playerHand.length - 1
    if (playerHand[newPlayerCard].Value === 'K' || playerHand[newPlayerCard].Value === 'Q' || playerHand[newPlayerCard].Value === 'J'){
        playerScore = playerScore + 10;
    } else if(playerHand[newPlayerCard].Value === 'A'){
        playerScore = playerScore + 11;
    } else{
        playerScore += playerHand[newPlayerCard].Value;
    }
    renderPlayerScore();
    if (playerScore>21){
        busted();
    }
}

//updates player score in HTML
function renderPlayerScore(){
    playerScoreEl.innerHTML = playerScore;
}

//calculates the computers hand
function getComputerScore(){
    for (i=0;i<2;i++){
        if (computerHand[i].Value === 'K' || computerHand[i].Value === 'Q' || computerHand[i].Value === "J"){
            computerScore = computerScore + 10;
        } else if (computerHand[i].Value === 'A'){
            computerScore = computerScore + 11;
        } else{
            computerScore = computerScore + computerHand[i].Value;
        }
    }
    // renderComputerScore();
    if (computerScore21){
        busted();
    }
}

//updates computer score in HTML
function renderComputerScore(){
    computerScoreEl.innerHTML = computerHand[0].Value;
}

//reveal the second hand of the computer and add the value
function getComputerSecondHand(){
    computerScore = computerHand[1].Value + computerHand[0].Value + computerScore;
    if (computerScore<17){

    }
}

function busted(){
    playerScoreEl.innerHTML = `Busted - ${playerScore}`
    resetBtns();
}

// when stand button is pressed check computer hand to see if they need to hit or not 
function standBtnFn(){
    getComputerScore()
}

// when hit button is pressed increase player hand by next card in shuffled deck, keep track of index
function hitBtnFn(){
    playerHand.push(shuffledDeck[nextCardIndex]);
    increaseNextCardIndex();
    getPlayerScore();
}



// 