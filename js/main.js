//declarations
const cardSuits = ['Spade', 'Heart', 'Club', 'Diamond']
const cardNum = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const unshuffledDeck = [];
const ranCard = ''
const playerHand = []

//Dom declarations & listeners
document.querySelector("#dealBtn").addEventListener("click", startGame);

//create deck
for (let i = 0; i < cardSuits.length; i++){
    for (let x = 0; x < cardNum.length; x++){
        let card = { Num: cardNum[x], Suit: cardSuits[i] }
        unshuffledDeck.push(card)
    }
}

//shuffle deck
const shuffledDeck = unshuffledDeck.sort((a, b) => 0.5 - Math.random())


//deal button pressed - deal first 2 cards to player, 1 to computer 
function startgGame(){
    let playerHand
}


// when hit button is pressed increase player hand 

