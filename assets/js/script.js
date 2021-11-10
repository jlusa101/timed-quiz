var timeLeft = 75;
var startQuiz = document.querySelector(".start-quiz");
var timer = null;


// Array of objects that contain questions, answers, and correct answer
let quizQuestions = [{
        "question": "In JavaScript, we assign values to variables by which operator?",
        "possibleAnswers": ["===", "+", "=", "=="],
        "correctAnswer": "="
    },
    {
        "question": "",
        "possibleAnswers": [],
        "correctAnswer": ""
    },
    {
        "question": "",
        "possibleAnswers": [],
        "correctAnswer": ""
    },
    {
        "question": "",
        "possibleAnswers": [],
        "correctAnswer": ""
    },
    {
        "question": "",
        "possibleAnswers": [],
        "correctAnswer": ""
    }
]

var timerHandler = function() {
    timeLeft--;
    if (timeLeft === 0) {
        clearInterval(timer);
        alert("Game Over!");
    }
    document.getElementById("countdown").innerHTML = timeLeft;
};

var questionHandler = function() {
    var newSect = document.createElement("div");
    newSect.className = "center";
    document.body.appendChild(newSect);
    var newQuest = document.createElement("h1");
    newQuest.textContent = quizQuestions[0].question;
    newSect.appendChild(newQuest);

};


// Event listener on the button that starts the quiz. Once clicked,
// the first question is shown to user and the timer starts counting down
startQuiz.addEventListener("click", function() {
    document.querySelector("main").style.display = "none";
    questionHandler();
    timer = setInterval(timerHandler, 1000);
});