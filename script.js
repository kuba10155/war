let deckId = ""
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const drawCardsBtn = document.getElementById("draw-cards-btn")
const newDeckBtn = document.getElementById("new-deck-btn")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function handleClick() {
  clear()
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id
      drawCardsBtn.disabled = false
      getRemainingCards(data.remaining)
    })
}

function getCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      if(data.remaining > 0){
        let i=0
        for(const child of cardsContainer.children) {
          child.innerHTML = `
            <img class="card" src="${data.cards[i].image}"></img>
          `
          i++
        }
        getRemainingCards(data.remaining)
        header.textContent = determineCardWinner(data.cards[0].value,
        data.cards[1].value)
      }
      if(data.remaining == 0) {
        drawCardsBtn.disabled = true
        getRemainingCards(data.remaining)
        determineFinalWinner()
      }
      getScore()
    })
}

function determineCardWinner(card1, card2) {
  const cardsValue = ["2", "3", "4", "5", "6", "7", "8", "9",
  "10", "JACK", "QUEEN", "KING", "ACE"]
  const card1ValueIndex = cardsValue.indexOf(card1)
  const card2ValueIndex = cardsValue.indexOf(card2)

  if(card1ValueIndex > card2ValueIndex) {
    computerScore++
    return "Computer wins!"
  } else if(card1ValueIndex < card2ValueIndex) {
    myScore++
    return "You win!"
  } else {
    return "War!"
  }
  getScore()
}

function getRemainingCards(remaining) {
  remainingText.textContent = `Remaining cards: ${remaining}`
}

function getScore() {
  computerScoreEl.textContent = `Computer score: ${computerScore}`
  myScoreEl.textContent = `My score: ${myScore}`
}

function clear() {
  const a = document.getElementsByClassName("card-slot")
  a[0].innerHTML = ""
  a[1].innerHTML = ""
  computerScore = 0
  myScore = 0
  getScore()
  header.textContent = "Game of War"
}

function determineFinalWinner() {
  if(computerScore > myScore) {
    header.textContent = "The computer won the game!"
  } else if(computerScore < myScore) {
    header.textContent = "You won the game!"
  } else {
    header.textContent = "It's a tie game!"
  }
}

newDeckBtn.addEventListener("click", handleClick)
drawCardsBtn.addEventListener("click", getCards)
