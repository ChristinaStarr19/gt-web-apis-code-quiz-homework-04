//VARIABLE DEFINITIONS
var timeLeft = 75;
//This is how much time the user has to play the game.
var timerEl = document.getElementById("timer");
//This references the element with the ID of timer in HTML.
var startHere = document.getElementById("startHere");
//This references the button with the id of startHere in HTML.
var welcome = document.getElementById("welcome");
var questionSection = document.getElementById("question");
//This references the element with the ID of question1 in HTML.
startHere.addEventListener("click", begin);
var questionIndex = 0;
var timeInterval;
var choiceEl;
var responseEl;
var initialsEl;
var submitEl;
var highScoresSaved = [];

var testContent = [
  {
    question: "Commonly Used data types DO NOT Include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "The condition in an if/ else statement is enclosed within ___.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
  },
  {
    question: "Arrays in JavaScript can be used to store __",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans**",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "Sting values must be enclosed within __ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "parentheses",
  },

  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/ bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

//FUNCTION DEFINITIONS
function begin() {
  welcome.setAttribute("style", "display:none");
  timerEl.textContent = timeLeft + ":Seconds left";
  timerStart();
  renderQuestion();
}

function renderQuestion() {
  if (questionIndex === 5) {
    endGame();
  }
  //create QUESTION
  questionSection.setAttribute("style", "display:block");
  var questionEL = document.createElement("h3");
  //add content
  questionEL.textContent = testContent[questionIndex].question;
  //append to existing element
  questionSection.append(questionEL);
  // create UNORDEREDLIST
  var choiceList = document.createElement("div");
  //add content
  choiceList.textContent = "";
  //append to existing element
  questionSection.append(choiceList);
  //create ANSWERCHOICE A
  for (var i = 0; i < 4; i++) {
    //create an element
    choiceEl = document.createElement("li");
    //choiceEl = document.createElement("button"); THey say I can just create a button instead.
    //add content
    choiceEl.textContent = testContent[questionIndex].choices[i];
    //add style
    choiceEl.setAttribute("type", "button");
    //They say I don't need this.
    choiceEl.setAttribute("class", "btn btn-primary mybutton btn-block");
    //append to existing element
    choiceList.append(choiceEl);
  }
  //create input
  responseEl = document.createElement("p");
  //add content
  // responseEl.textContent = "";
  //add two classes
  responseEl.setAttribute("class", "correct incorrect");
  //append to existing element
  choiceList.append(responseEl);
}

function timerStart() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft + "Seconds left";
    if (timeLeft <= 0) {
      questionSection.innerHTML = "";
      endGame();
    }
  }, 1000);
}

function endGame() {
  //This will stop the timer.
  clearInterval(timeInterval);
  //This will clear the section and prepare it for the endGame screen.
  // questionSection.innerHTML = "";
  //Create h3 to display initials question.
  var questionEL = document.createElement("h3");
  //add content
  questionEL.textContent =
  "You scored " +
  timeLeft +
  " points! If you would like to save this score, please type your intials below and click submit.";
  //append to existing element
  questionSection.append(questionEL);
  //Create input field so that the initials can be saved.
  newinitialsEl = document.createElement("input");
  //Content will be added later and saved to the local storage when submit button clicked.
  //Add a name to this input.
  newinitialsEl.textContent = "";
  //append to existing element
  questionSection.append(newinitialsEl);
  //storing a reference
  initialsEl = document.getElementsByTagName("input");
  console.log(initialsEl);
  //Create list item element so that the button can be appended.
  submitEl = document.createElement("li");
  //choiceEl = document.createElement("button"); THey say I can just create a button instead.
  //add content
  submitEl.textContent = "Submit";
  //add style
  submitEl.setAttribute("type", "button");
  submitEl.setAttribute(
    "class",
    "btn btn-primary mybutton btn-block submit-button"
    );
    //append to existing element
    questionSection.append(submitEl);
  }

  function renderHighScores(){
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    
    for (var i = 0; i < highScores.length; i++) {
      //create the element
      var highScoresMessage = document.createElement("h3");
      //add content
      highScoresMessage.textContent = highScores[i].initials + " scored " + highScores[i].score;
      //append to existing element
      questionSection.append(highScoresMessage);
    }
  }
  
  //EVENT LISTENERS
  //Within this section, I want you listen for a click from any the .mybutton.
  questionSection.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.matches(".mybutton")) {
      if (choiceEl.textContent !== testContent[questionIndex].answer) {
        timeLeft = timeLeft - 10;
        responseEl.textContent = "incorrect";
      } else {
        responseEl.textContent = "correct";
      }
      var responseTime = setInterval(function () {
        //Clear the HTML to start fresh
        questionSection.innerHTML = "";
        questionIndex++;
        clearInterval(responseTime);
        renderQuestion();
      }, 1000);
    }
  });

  //Within this section, I want you to listen for a click from the .submit-button.
questionSection.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.matches(".submit-button")) {
    //Push timeLeft and initials into array. We use index 0 because it is the only input.
    highScoresSaved.push({"initials":initialsEl[0].value, "score":timeLeft});
    console.log(highScoresSaved)
  //save timeLeft and initials in local storage
  localStorage.setItem("highScores",JSON.stringify((highScoresSaved)));
  console.log(highScoresSaved);
  questionSection.innerHTML = "";
  renderHighScores();
  }
});

