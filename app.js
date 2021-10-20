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
      content: '🍍',
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


const winAudio = document.querySelector("#victory-sound");
const spookAudio = document.querySelector("#spooky-sound");
const monkeAudio = document.querySelector("#monke-sound");
const fruitAudio = document.querySelector("#fruit-sound");
let gameSong;


let gameState = false;
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
  stopSound(introAudio);
  startGame();
});
  switch(content.value) {
    case 'halloween': cardColor = 'orange';
    gameSong = spookAudio;
    document.getElementById("bg").style.backgroundImage = "url('spookywp.jpg')";
    document.getElementById("bg").style.backgroundSize = "100% 100%";
    break;

    case 'animal': cardColor = 'green';
    gameSong = monkeAudio;
    document.getElementById("bg").style.backgroundImage = "url('monkewp.jpg')";
    document.getElementById("bg").style.backgroundSize = "100% 100%";
    break;

    case 'fruits': cardColor = 'blue';
    gameSong = fruitAudio;
    document.getElementById("bg").style.backgroundImage = "url('flowerswp.jpg')";
    document.getElementById("bg").style.backgroundSize = "100% 100%";
    break;

    default: 'You didnt pick a theme boi';
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
<div class="card-flip-highScore">High Score is: <span id="scoreText"></span></div>
<div class="card-flip-currentTime">
    <h2>Time</h2>
    <h3 class="time" id="display">00:00:00</h3>
</div>
`
showHighscore()
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
  playAudio(gameSong);
}

function restartGame() {
  resetState();
  stopSound(winAudio);
  startGame();
}

function resetState() {
  resetBoard();
  deleteCards();
  gameState = false
}

function deleteCards() {
  document.querySelector(".flip-card-container").innerHTML = "";
}

function flipCard() {
  if(!gameState) {
    start();
    gameState = true;
  }
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
  reset();
  stopSound(gameSong);
  playAudio(winAudio);
}

function countMatchedCards() {
  const isFlipped = document.querySelectorAll(".flip");
  if (isFlipped.length == cardArray.length) {
    //take away true, only there temporarily
    setTimeout(() => {
      gameOver();
      stopSound(gameSong);
    }, 500);
  }
}

function playAudio(audio) {
  audio.volume = 0.8;
  audio.playbackRate = 1;
  audio.play();
}

function stopSound(audio) {
  audio.currentTime = 0;
  audio.pause();
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



// Clock