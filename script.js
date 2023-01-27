let deckId = ""
const cardsContainer = document.getElementById("cards")
const drawCardsBtn = document.getElementById("draw-cards-btn")
const newDeckBtn = document.getElementById("new-deck-btn")

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id
      drawCardsBtn.disabled = false
    })
}

function getCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      let i=0
      for(const child of cardsContainer.children) {
        child.innerHTML = `
          <img class="card" src="${data.cards[i].image}"></img>
        `
        i++
      }
      console.log(determineCardWinner(data.cards[0].value, data.cards[1].value))
    })
}

function determineCardWinner(card1, card2) {
  const cardsValue = ["2", "3", "4", "5", "6", "7", "8", "9",
    "10", "JACK", "QUEEN", "KING", "ACE"]
  const card1ValueIndex = cardsValue.indexOf(card1)
  const card2ValueIndex = cardsValue.indexOf(card2)

  return card1ValueIndex > card2ValueIndex ?
  "First card wins!" : card2ValueIndex > card1ValueIndex ?
  "Second card wins!" : "It's a tie!"
}

newDeckBtn.addEventListener("click", handleClick)
drawCardsBtn.addEventListener("click", getCards)
