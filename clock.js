// Declare variables to use in our functions below
let startTime;
let timeToBeat;
let elapsedTime = 0;
let timerInterval;
let highScore = null;
let currentTime = "";
let topScores = [];

// Push highscore to HTML
function showHighscore() {
  let highScoreFromLS = localStorage.getItem("score");
  console.log(highScoreFromLS);
  if (highScoreFromLS == null) {
    document.getElementById("scoreText").innerHTML = "00:00:00";
    return;
  }
  document.getElementById("scoreText").innerHTML = highScoreFromLS;
}

// Convert time to a format of hours, minutes, seconds, and milliseconds
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
    currentTime = elapsedTime;
  }, 10);
}

function reset() {
  let displayScore = document.getElementById("displayScore");

  if (highScore === null) {
    timeToBeat = currentTime;
    highScore = timeToString(currentTime);
    displayScore.innerHTML = `Nice: ${timeToString(currentTime)}`;
  } else if (currentTime < timeToBeat) {
    timeToBeat = currentTime;
    highScore = timeToString(currentTime);
    displayScore.innerHTML = `New highscore: ${highScore}!!!`;
  } else {
    displayScore.innerHTML = `Almost: ${timeToString(currentTime)}`;
  }
  localStorage.setItem("score", highScore);
  add(topScores, currentTime);
  sortArray(topScores);
  console.log(topScores);
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  showHighscore();
}

// Sort array
function sortArray(array) {
  array.sort(function (a, b) {
    return a - b;
  });
}

function add(array, time) {
  array.unshift(time);
  if (array.length >= 3) {
    array.length = 3;
  }
}

function seedScores() {
  sortTimes(times);
  for (let i = 0; i < 3; i++) {
    add(times[i]);
  }
  sortTimes(topScores);
  console.log(topScores);
}
