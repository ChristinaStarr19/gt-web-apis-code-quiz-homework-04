var secondsLeft = 75;
var timeEl = document.querySelector("#timer");
var startGame = document.querySelector("#startGame");
var quizMain = document.querySelector("#quizMain");
var secondDiv = document.querySelector("#secondDiv");
function setTime() {
  startGame.addEventListener("click", function () {
    quizMain.style.display = "none";
    secondDiv.style.display = "block";
    var timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
      if (secondsLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  });
}
setTime();