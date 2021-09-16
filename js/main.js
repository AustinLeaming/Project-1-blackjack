//constants
const cardSuits = ['♠', '♥', '♣', '♦'];
const cardValue = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
const unshuffledDeck = [];

//variables 
let nextCardIndex = 0;
let playerScore = 0;
let computerScore = 0;
let newPlayerCard = 0;
let newComputerCard = 0;
let shuffledDeck = [];
let playerHand = [];
let computerHand = [];

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

//deal button function - deal first 2 cards to player, 2 to computer keep 2nd card secret
//clears the board
//clears hands of player and computer
//shuffles cards
//passes out the first round of hands
//sets styles for the buttons
function dealBtnFn(){
    clearBoard();
    clearHands();
    shuffleCards();
    passFirstRoundHand();
    getButtonStyles();
    createPlayerVisualCard();
    removeVisualCards();
    createVisualCards();
}

//set styles for buttons once deal button is pressed
function getButtonStyles(){
    dealEl.classList.add('inactive');
    dealEl.classList.remove('active');
    hitEl.classList.add('hitBtnStyle');
    hitEl.classList.remove('inactive')
    standEl.classList.add('standBtnStyle');
    standEl.classList.remove('inactive');
}

//remove styles and set to default
function resetBtns(){
    dealEl.classList.remove('inactive');
    dealEl.classList.add('active');
    hitEl.classList.remove('hitBtnStyle');
    hitEl.classList.add('inactive');
    standEl.classList.remove('standBtnStyle');
    standEl.classList.add('inactive');
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

function createPlayerVisualCard(){
    let playerBoard = document.querySelector('#playerBoardSpace');
    let playerCard = document.createElement('div');
    playerCard.setAttribute('id', 'playerCard')
    playerCard.innerText = `${playerHand[0].Value} ${playerHand[0].Suit}`;
    playerBoard.appendChild(playerCard);
}

function removeVisualCards(){
    let computerBoard = document.querySelector('#computerCard');
    let playerBoard = document.querySelector('#playerBoardSpace');
    computerBoard.innerHTML = null;
    computerBoard.innerText = null;
    playerBoard.innerText = null;
    playerBoard.innerText = null;
}

//when deal button is pressed
function createVisualCards(){
    let computerBoard = document.querySelector('#computerCard');
    let computerCard = document.createElement('div')
    computerCard.innerText = `${computerHand[0].Value} ${computerHand[0].Suit}`
    computerBoard.appendChild(computerCard);
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

//appends score of previous game to the screen
function updateHistoryLog(){
    let ul = document.querySelector('#log')
    let li = document.createElement("li")
    li.innerText = `Player score: ${playerScore} - Computer score: ${computerScore}`
    ul.appendChild(li);
}

//clears the value in HTML
function clearBoard(){
    playerScoreEl.innerHTML = '';
    computerScoreEl.innerHTML = '';
}

//after winner is declared, set score to zero
function clearScore(){
    playerScore = 0;
    computerScore = 0;
}

//after winner is declared, clear out both players hand
function clearHands(){
    playerHand = [];
    computerHand = [];
    resetBtns();
}

//pass the 2nd card in the index to the computer
//increase the counter index for picking cardds
//pass the index back to the player so they can get the 3rd card
//calculate the score of the computers hand
function passComputerHand(){
    computerHand.push(shuffledDeck[nextCardIndex])
    updateComputerScoreinHTML();
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
    updatePlayerScoreinHTML();
    checkForBust(playerScore);
}

//comes from getPlayerScore function
function checkForBust(score){
    if (score > 21){
        bustedPlayer()
    }
}

//updates player score in HTML
function updatePlayerScoreinHTML(){
    playerScoreEl.innerHTML = playerScore;
}

//calculates the computers hand
function getComputerScore(){
    computerScore = 0;
    for (i=0;i<computerHand.length;i++){
        if (computerHand[i].Value === 'K' || computerHand[i].Value === 'Q' || computerHand[i].Value === "J"){
            computerScore = computerScore + 10;
        } else if (computerHand[i].Value === 'A'){
            computerScore = computerScore + 11;
        } else{
            computerScore = computerScore + computerHand[i].Value;
        }
    }
    checkComputerHand();
}

//checks whether or not the computer should pull another card, stays or busts
function checkComputerHand(){
    if (computerScore <= 17){
        computerHand.push(shuffledDeck[nextCardIndex])
        //calculateComputerScore();
        getComputerScore();
    } else if (computerScore >= 17 && computerScore <= 21){
        compareHand();
    } else if (computerScore > 21){
        bustedComputer();
    }
}

//compare the hands after the player stands and the computer has less than 21.
function compareHand(){
    if (playerScore > computerScore){
        setPlayerWinner();
    } else if (computerScore > playerScore){
        setComputerWinner();
    } else if (computerScore == playerScore){
        setTieWinner();
    }
}

//updates computer score in HTML
function updateComputerScoreinHTML(){
    computerScoreEl.innerHTML = computerHand[0].Value;
}


///////////////////////
//outcomes of the game/
///////////////////////

//results if the computer busts
function bustedComputer(){
    computerScoreEl.innerHTML = `Busted - ${computerScore}`
    setPlayerWinner();
}

//results if the player busts
function bustedPlayer(){
    playerScoreEl.innerHTML = `Busted - ${playerScore}`
    setComputerWinner();
}

//player win function
function setPlayerWinner(){
    playerScoreEl.innerHTML = `Player wins - ${playerScore}`
    computerScoreEl.innerHTML = `Busted - ${computerScore}`
    updateHistoryLog();
    clearHands();
    clearScore();
}

//function to declare the computer the winner
function setComputerWinner(){
    computerScoreEl.innerHTML = `Dealer wins - ${computerScore}`
    updateHistoryLog();
    clearHands();
    clearScore();
}

//results of tie game
function setTieWinner(){
    computerScoreEl.innerHTML = `Tie Game - ${computerScore}`;
    playerScoreEl.innerHTML = `Tie game - ${playerScore}`;
    updateHistoryLog();
    clearHands();
    clearScore();
    clearBoard();
}