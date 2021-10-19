

//Define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//hold display value (00)
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//Define var to hold setInterval function
let interval = null;

//define var to hold stopwatch status
let status = "stopped";

//stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch(){

    seconds++;

    //logic to determin ewhen to icrement next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
        minutes =0;
        hours++;

        }
    }

//if seconds/minutes/hours are only one digit, adda leading 0 to the value
if(seconds < 10){
    displaySeconds = "0" + seconds.toString();
}
else{
    displaySeconds = seconds;
}

if(minutes < 10){
    displayMinutes = "0" + minutes.toString();
}
else{
    displayMinutes = minutes;
}

if(hours < 10){
    displayHours = "0" + hours.toString();
}
else {
    displayHours = hours;
}

//display updated time values to user
document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

window.setInterval(stopWatch, 1000);

function startStop(){
    if(status === "stopped"){
        interval = window.setInterval (stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";
    }
    else{
        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";
    }
}

//function to reset the stopwatch
function reset(){
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerhtml = "00:00:00";
    document.getElementById("startStop."),innerhtml

}

//burgermenu
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', function () {
            nav.classList.toggle('nav-active');
       
       
            navLinks.forEach((link, index) => {
               if (link.style.animation) {
                   link.style.animation = ''
                  
               }
               else{
                   link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 1.5}s`;
                console.log(index / 7); 
            }
       
        });
            //burger animation
            burger.classList.toggle('toggle');
   
    });
}

navSlide();

  
//popup
// Get the modal
var modal = document.getElementById("myModal");


// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
