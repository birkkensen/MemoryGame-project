//let emojis = [ '🐒', '🐒', '🦊', '🦊', '🐯', '🐯', '🐕', '🐕', '🐷', '🐷', '🐄', '🐄', '🐪', '🐪', '🐘', '🐘', '🦏', '🦏', '🦒', '🦒', '🐹', '🐹', '🐨', '🐨' ]

const cards = document.querySelectorAll(".flip-card-inner");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; //so not to click 2 times at same card and get a pair
  this.classList.add("flip");

  if (!hasFlippedCard) {
    //bad name. "firstcardflipped"
    hasFlippedCard = true;
    firstCard = this;
  } else {  //changed this
    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.letter === secondCard.dataset.letter) {
    disableCards();
    return;  //different way, i would do if/else probably
  }
  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  //ES6 destructuring assignment
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  //IIFE
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 24);
    card.style.order = ramdomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
