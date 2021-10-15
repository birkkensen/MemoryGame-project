//let emojis = [ '🐒', '🐒', '🦊', '🦊', '🐯', '🐯', '🐕', '🐕', '🐷', '🐷', '🐄', '🐄', '🐪', '🐪', '🐘', '🐘', '🦏', '🦏', '🦒', '🦒', '🐹', '🐹', '🐨', '🐨' ]

let animalTheme = [
  {
    content: '🐒',
    id: 'a'
  },
  {
    content: '🦊',
    id: 'b'
  },
  {
    content: '🐯',
    id: 'c'
  },
  {
    content: '🐕',
    id: 'd'
  },
  {
    content: '🐷',
    id: 'e'
  },
  {
    content: '🐄',
    id: 'f'
  },
  {
    content: '🐪',
    id: 'g'
  },
  {
    content: '🐘',
    id: 'h'
  },
  {
    content: '🦒',
    id: 'i'
  },
  {
    content: '🐹',
    id: 'j'
  },
  {
    content: '🐨',
    id: 'k'
  },
  {
    content: '🐝',
    id: 'l'
  },
];
let halloweenTheme = [
  {
    content: '🎃',
    id: 'a',
  },
  {
    content: '🕯',
    id: 'b',
  },
  {
    content: '👻',
    id: 'c',
  },
  {
    content: '🕸',
    id: 'd',
  },
  {
    content: '🕷',
    id: 'e',
  },
  {
    content: '💀',
    id: 'f',
  },
  {
    content: '⚰️',
    id: 'g',
  },
  {
    content: '🦇',
    id: 'h',
  },
  {
    content: '😈',
    id: 'i',
  },
  {
    content: '🧟‍♂️',
    id: 'j',
  },
  {
    content: '🌕',
    id: 'k',
  },
  {
    content: '🧛',
    id: 'l',
  },
  ];

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

function createCards () {
  for(i = 0; i < cardArray.length; i++) {
    card(cardArray[i])
  }
  const cards = document.querySelectorAll(".flip-card-inner");
  cards.forEach(card => {
    card.addEventListener("click", flipCard)
  })
}

function card(card) {
  document.querySelector(".flip-card-container").innerHTML += 
  `
<div class="flip-card-inner" data-letter="${card.id}">
    <div class="flip-card-front">
  </div>
  <div class="flip-card-back">
      <p>${card.content}</p>
  </div>
</div>
  `
}

function startGame() { 
  document.querySelector(".flip-card-container").innerHTML = `
  <h1 class="card-flip-title">Memory Game</h1>
  <div class="card-score-container">
    <h3>Time</h3>
    <h3>Flips: 0</h3>
  </div>
  `; 
  createCards();
  shuffleCards();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; //so not to click 2 times at same card and get a pair
  this.classList.add("flip");
  countMatchedCards();
  if (!hasFlippedCard) {
    //bad name. "firstcardflipped"
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

function shuffleCards() {   //IIFE
  const cards = document.querySelectorAll(".flip-card-inner");
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 24);
    card.style.order = ramdomPos;
  });
};

function countMatchedCards() {
  const isFlipped = document.querySelectorAll(".flip");
  if(isFlipped.length === cardArray.length) {
    setTimeout(() => {
      startGame()
    }, 1000)
    
  }
}
// cards.forEach((card) => card.addEventListener("click", flipCard));

