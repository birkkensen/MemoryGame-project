// Sort array
function sortTimes() {
    times.sort(function(a, b) {
      return a - b;
    });
  }
  
  
  // Declare variables to use in our functions below
  let startTime;
  let timeToBeat = 0;
  let elapsedTime = 0;
  let timerInterval;
  var highScore = localStorage.getItem('hs');
  console.log(highScore);
  
  // Push highscore to HTML
  function showHighscore() {
    document.getElementById("scoreText").innerHTML = highScore;
    localStorage.setItem('hs', highScore);
  }
  
  showHighscore();
  
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
    }
    
  // Create "start", "pause" and "reset" functions
    var currentTime = "";
    const times = [];
    
    function start() {
      sortTimes();
      timeToBeat = times[0];
      console.log(timeToBeat);
  
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
        currentTime = elapsedTime;
      }, 10);
      showButton("PAUSE");
    }
  
    function pause() {
      clearInterval(timerInterval);
      showButton("PLAY");
    }
    
    function reset() {
      times.push(currentTime);
  
      if (currentTime < timeToBeat) {
          highScore = timeToString(currentTime);
      }
      
      clearInterval(timerInterval);
      print("00:00:00");
      elapsedTime = 0;
      showButton("PLAY");
  
      console.log(highScore);
      showHighscore();
      console.log(times);
  
      seedScores();
    }
    
  // Create function to display buttons
    function showButton(buttonKey) {
      const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
      const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
      buttonToShow.style.display = "block";
      buttonToHide.style.display = "none";
    }
  
  // Create event listeners 
    let playButton = document.getElementById("playButton");
    let pauseButton = document.getElementById("pauseButton");
    let resetButton = document.getElementById("resetButton");
    
    playButton.addEventListener("click", start);
    pauseButton.addEventListener("click", pause);
    resetButton.addEventListener("click", reset);
    
  // Score array
  let topScores = [];
  
  
  function seedScores() {
    sortTimes();
    for (let i = 0; i < 3; i++) {
    
      // console.log(item);
      topScores.push(times[i]);
      
      // topScores.pop();
    }
    console.log(topScores);
  }