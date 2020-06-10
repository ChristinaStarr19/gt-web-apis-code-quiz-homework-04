 var timeLeft = 75;
//This is how much time the user has to play the game.
var timerEl = document.getElementById("#timer");
//This references the element with the ID of timer in HTML.
var startHere = document.getElementById("#startHere");
//This references the button with the id of startHere in HTML.
var welcome = document.getElementById("#welcome");
var question1 = document.getElementById("#question1");
//This referencfes the element with the ID of question1 in HTML.

function begin(){
    startHere.addEventListener("click", function() {
    //When the user clicks on startHere, this funtion will begin.
    welcome.style.display = "none";
    question1.style.display = "block";
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Quiz Time:" + timeLeft;
        if (timeLeft === 0) {
        clearInterval(timerInterval);
        }
    }, 1000);
 });
}


