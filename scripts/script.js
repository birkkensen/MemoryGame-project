//burgermenu
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", function () {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.4
        }s`;
        console.log(index / 7 + 0.1);
      }
    });
    //burger animation
    burger.classList.toggle("toggle");
  });
};

navSlide();

//popup
// Get the modal
var modal = document.getElementById("myModal");

var rulesmodal = document.getElementById("rules");

var gameModal = document.getElementById("game");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

var rulesbtn = document.getElementById("myBtnrules");

var gameBtn = document.getElementById("myGameBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
var span = document.querySelectorAll(".close");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

rulesbtn.onclick = function () {
  rulesmodal.style.display = "block";
  updateLS();
};

gameBtn.onclick = function () {
  gameModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };
// Doing a forEach loop
span.forEach((span) => {
  span.addEventListener("click", () => {
    modal.style.display = "none";
    rulesmodal.style.display = "none";
    gameModal.style.display = "none";
  });
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == rulesmodal) {
    modal.style.display = "none";
    rulesmodal.style.display = "none";
    gameModal.style.display = "none";
  }
};

// LocalStorage

const inpKey = document.getElementById("inpKey");
const inpValue = document.getElementById("inpValue");
const btnInsert = document.getElementById("btnInsert");
const lsOutput = document.getElementById("lsOutput");

btnInsert.onclick = function () {
  const key = inpKey.value;
  const value = inpValue.value;

  if (key && value) {
    localStorage.setItem(key, value);
    inpKey.value = "";
    inpValue.value = "";
  }
  updateLS();
};

function updateLS() {
  lsOutput.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    lsOutput.innerHTML += `${key}: ${value}<br />`;
  }
}

function clearLS() {
  localStorage.clear();
  lsOutput.innerHTML = "";
}
