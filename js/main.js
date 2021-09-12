//declarations
const cardSuits = ['Spade', 'Heart', 'Club', 'Diamond']
const cardNum = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']

//Dom declarations
document.querySelector("#dealBtn").addEventListener("click", getRandom);

// pick a random two values from card suit and card num 
function getRandom(){
    const ranIdxSuits = Math.floor(Math.random() * 4)
    const ranIdxNum = Math.floor(Math.random() * 13)
    const ranSuits = cardSuits[ranIdxSuits]
    const ranNum = cardNum[ranIdxNum]
    console.log(ranSuits)
    console.log(ranNum)
}

// //button functions
// dealEl.addEventListener
