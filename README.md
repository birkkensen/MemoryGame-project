# MemoryGame-project

Memory card game as our first group project
Hello world, trying stuff out

1. Stop watch.
Going throught it by a tutorial, which is great. Code explained and especially JS, which I need to broaden my understaning for.

So why is "status" being marked in JS?
And why do I have such a difficult time to make the JS work?

</


 display: flex;
  justify-content: space-around;
  width: 30%;


  pop up

  
.popup .overlay{
  position:fixed;
  top:0px;
  left:0px;
  width:100vw;
  height:100vh;
  background: rgba(0,0,0,0.7);
  z-index:1;
  display:  none;

}

.popup .content {
  position:fixed;
  top:20%;
  left: 43%;
  transform:translate (-50%, -50%) scale (0);
  background: rgb(240, 233, 233);
  width:450px;
  height:220px;
  z-index:2;
  text-align:center;
  padding:10px;
  box-sizing: border-box;
  color:#000;
  font-family:'Poppins', sans-serif;
  font-size: .8rem;
  overflow:auto;
  display: none;
}

.popup .close-btn{
  position:absolute;
  cursor:pointer;
  right:20px;
  top: 10px; 
  width:30px;
  height:30px;
  background: #220;
  color:#fff;
  font-size:25px;
  font-weight: 600px;
  line-height:30px;
  text-align:center;
  border-radius:50%;
}

.popup.active .overlay{
  display:block;

}

.popup.active .content{
  transition:all 300ms ease-in-out;
  transform:translate(100%) scale(1);
}

 <div class="popup" id="popup-1">
    <div class="overlay"> </div>
      <div class="content">
        <div class="close-btn" onclick="togglePopup()">&times; 
        </div>
      <h1>Title</h1>
      <p>Lorem "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
        liquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
        qui officia deserunt mollit anim id est laborum."</p>
      
      </div>
    </div>
    <button onclick="togglePopup()"> Show Popup</button>

    
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}
