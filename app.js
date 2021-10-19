let themes = {
  animal: [ 
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
],
  fruits : [
    {
      content: '🍏',
      id: 'a',
    },
    {
      content: '🍐',
      id: 'b',
    },
    {
      content: '🍊',
      id: 'c',
    },
    {
      content: '🍋',
      id: 'd',
    },
    {
      content: '🍌',
      id: 'e',
    },
    {
      content: '🍑',
      id: 'f',
    },
    {
      content: '🥝',
      id: 'g',
    },
    {
      content: '🍓',
      id: 'h',
    },
    {
      content: '🍇',
      id: 'i',
    },
    {
      content: '🍉',
      id: 'j',
    },
    {
      content: '🫐',
      id: 'k',
    },
],
  halloween: [
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

],
};





let cardArray;
let cardColor;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


//Duplicate array and merge it with the original
function duplicateArray(array) {
  let copy = array;
  array = array.concat(copy);
  return array;
}

function themePicker(content) {
const overlayIntro = document.querySelector(".overlay.intro");
overlayIntro.addEventListener("click", () => {
  overlayIntro.classList.remove("visible");
  startGame();
});
  switch(content.value) {
    case 'halloween': cardColor = 'orange'
    break;
    case 'animal': cardColor = 'green'
    break;
    case 'fruits': cardColor = 'blue'
    break;
    default: 'You didnt pick a theme boi'
  }
  cardArray = duplicateArray(themes[content.value])
}



function createCards() {
  for (i = 0; i < cardArray.length; i++) {
    card(cardArray[i]);
  }
  const cards = document.querySelectorAll(".flip-card-inner");
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function setCardColor() {
  const flipCardFront = document.querySelectorAll('.flip-card-front');
  const flipCardBack = document.querySelectorAll('.flip-card-back');

  flipCardFront.forEach(card => {
    switch(cardColor) {
      case 'orange': card.classList.add('orange');
      break;
      case 'green': card.classList.add('green');
      break;
      case 'blue': card.classList.add('blue');
      break;
    }
    });
  flipCardBack.forEach(card => {
    switch(cardColor) {
      case 'orange': card.classList.add('light-orange');
      break;
      case 'green': card.classList.add('light-green');
      break;
      case 'blue': card.classList.add('light-blue');
      break;
    }
    });
}

function card(card) {
document.querySelector(".flip-card-container").innerHTML += `
<div class="flip-card-inner" data-letter="${card.id}"> 
    <div class="flip-card-front">
  </div>
  <div class="flip-card-back">
      <p>${card.content}</p>
  </div>
</div>
  `;
}

function createTimerAndHighScore() {
document.querySelector(".flip-card-container").innerHTML += `
<div class="card-flip-highScore">High Score 00:59</div>
<div class="card-flip-currentTime">
    <h2>Time</h2>
    <h3>01:32</h3>
</div>
`
}

const overlayOutro = document.querySelector(".overlay.outro");
overlayOutro.addEventListener("click", () => {
  overlayOutro.classList.remove("visible");
  restartGame();
});

function startGame() {
  createTimerAndHighScore();
  createCards();
  setCardColor();
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
