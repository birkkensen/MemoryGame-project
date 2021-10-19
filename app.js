
//Duplicate array and merge it with the original
function duplicateArray(array) {
  let copy = array;
  array = array.concat(copy);
  return array;
}

let cardArray = duplicateArray(halloweenTheme);
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createCards() {
  for (i = 0; i < cardArray.length; i++) {
    card(cardArray[i]);
  }
  const cards = document.querySelectorAll(".flip-card-inner");
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function card(card) {
  document.querySelector(".flip-card-container").innerHTML += `
<div class="flip-card-inner" data-letter="${card.id}"> 
    <div class="flip-card-front">
  </div>
  <div class="flip-card-back">
      ${card.content}
  </div>
</div>
  `;
}

const overlayIntro = document.querySelector(".overlay.intro");
overlayIntro.addEventListener("click", () => {
  overlayIntro.classList.remove("visible");
  startGame();
});

const overlayOutro = document.querySelector(".overlay.outro");
overlayOutro.addEventListener("click", () => {
  overlayOutro.classList.remove("visible");
  restartGame();
});

function startGame() {
  createCards();
  shuffleCards();
}

function restartGame() {
  resetState();
  startGame();
}

function resetState() {
  resetBoard();
  deleteCards();
}

function deleteCards() {
  document.querySelector(".flip-card-container").innerHTML = "";
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; //so not to click 2 times at same card and get a pair
  this.classList.add("flip");
  countMatchedCards();
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.letter === secondCard.dataset.letter) {
    disableCards();
    return;
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

function shuffleCards() {
  //IIFE
  const cards = document.querySelectorAll(".flip-card-inner");
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 24);
    card.style.order = ramdomPos;
  });
}

function gameOver() {
  document.querySelector("#victory-text").classList.add("visible");
  playAudio();
}

function countMatchedCards() {
  const isFlipped = document.querySelectorAll(".flip");
  if (isFlipped.length === cardArray.length) {
    //take away true, only there temporarily
    setTimeout(() => {
      gameOver();
    }, 1000);
  }
}

function playAudio() {
  const audio = document.querySelector("#victory-sound");
  audio.volume = 0.5;
  audio.playbackRate = 0.5;
  audio.play();
}

/*function countMatchedCards() {
  const isFlipped = document.querySelectorAll(".flip");
  if (isFlipped.length === cardArray.length) {
    setTimeout(() => {
      startGame();
    }, 1000);
  }
} */
// cards.forEach((card) => card.addEventListener("click", flipCard));
