// Sort array
function sortTimes(array) {
    array.sort(function(a, b) {
      return a - b;
    });
  }

  function add(x) {
    topScores.unshift(x);
    if (topScores.length > 3) {
        topScores.length = 3;
    }
}
// function getHS() {
//   if (localStorage.getItem('highScore') === null) {
//     highScore = 'Play to set high score!'
//   } else {
//     highScore = localStorage.getItem('highScore');
//   }
// }
  
  
  // Declare variables to use in our functions below
  let startTime;
  let timeToBeat;
  let elapsedTime = 0;
  let timerInterval;
  var highScore = 0;
  // localStorage.setItem('highScore', '00:00:00');
  
  // Push highscore to HTML
  function showHighscore() {
    // getHS();
    document.getElementById("scoreText").innerHTML = highScore;

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
    
  // Create function to modify innerHTML
    function print(txt) {
      document.getElementById("display").innerHTML = txt;
      console.log(txt)
    }
    
  // Create "start", "pause" and "reset" functions
    var currentTime = "";
    const times = [];
    
    function start() {
      sortTimes(times);
      timeToBeat = times[0];
  
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
        currentTime = elapsedTime;
      }, 10);
    }

    function reset() {
      times.push(currentTime);

      if (!timeToBeat) {
        highScore = timeToString(currentTime)
      } else if (currentTime < timeToBeat) {
        highScore = timeToString(currentTime);
      }
      document.getElementById('displayScore').innerHTML = timeToString(currentTime);
      localStorage.setItem('highScore', timeToString(highScore));
      clearInterval(timerInterval);
      print("00:00:00");
      elapsedTime = 0;
      showHighscore();
      sortTimes(times);
      seedScores();
    }
    
  // Create function to display buttons
    // function showButton(buttonKey) {
    //   const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    //   const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    //   buttonToShow.style.display = "block";
    //   buttonToHide.style.display = "none";
    // }
  
  // Create event listeners 
    // let playButton = document.getElementById("playButton");
    // let pauseButton = document.getElementById("pauseButton");
    // let resetButton = document.getElementById("resetButton");
    
    // playButton.addEventListener("click", start);
    // pauseButton.addEventListener("click", pause);
    // resetButton.addEventListener("click", reset);
    
  // Score array
  let topScores = [];
  
  
  function seedScores() {
    sortTimes(times);
    for (let i = 0; i < 3; i++) {
        add(times[i]);
        console.log(times[i])
    }
    sortTimes(topScores);
    console.log(topScores);
  }