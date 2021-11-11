const numOfAnswers = 4;

var timeLeft = 75;
var startQuiz = document.querySelector(".start-quiz");
var timer = null;
var index = 0;


// Array of objects that contain questions, answers, and correct answer
let quizQuestions = [{
        "question": "Which company developed JavaScript?",
        "possibleAnswers": ["Bell Labs", "IBM", "Apple", "Netscape"],
        "correctAnswer": ""
    },
    {
        "question": "In JavaScript, we assign values to variables by which operator?",
        "possibleAnswers": ["===", "+", "=", "=="],
        "correctAnswer": "="
    },
    {
        "question": "Which is NOT a JavaScript Data Type?",
        "possibleAnswers": ["Boolean", "Number", "Float", "Object"],
        "correctAnswer": "Float"
    },
    {
        "question": "Which is used for comments in Javascript?",
        "possibleAnswers": ["//", "<!----!>", "****", "Comments"],
        "correctAnswer": "//"
    },
    {
        "question": "Inside which HTML element do we put the JavaScript?",
        "possibleAnswers": ["<head>", "<script>", "<style>", "<body>"],
        "correctAnswer": "<script>"
    },
    {
        "question": "Arrays in JavaScript can be used to store?",
        "possibleAnswers": ["Objects", "Numbers", "Strings", "All of the Above"],
        "correctAnswer": "<script>"
    }
]

var timerHandler = function() {
    timeLeft--;
    // If time is 0 or no more questions, the game ends and the user is notified
    if (timeLeft === 0) {
        // Stopping the timer
        clearInterval(timer);
        return;
    }
    document.getElementById("countdown").innerHTML = timeLeft;
};

// Function that handles the question and answer output on browser
var questionHandler = function(index) {
    var newForm = document.createElement("form");
    newForm.className = "center";
    document.body.appendChild(newForm);
    var newQuest = document.createElement("h1");
    newQuest.setAttribute("text-align", "left");
    newQuest.textContent = quizQuestions[index].question;
    newForm.appendChild(newQuest);

    for (var count = 0; count < numOfAnswers; count++) {
        var possibleAnswer = document.createElement("button");
        possibleAnswer.setAttribute("id", "btn");
        possibleAnswer.textContent = (count + 1 + ". " + quizQuestions[index].possibleAnswers[count]);
        newForm.appendChild(possibleAnswer);
    }
    // Incrementing the index for the next question
    index++;

    // Selecting all buttons with id btn and attach them to a variable
    var nextQuestion = document.querySelectorAll('button[id=btn]');

    // Attach an event listener to each of the buttons
    nextQuestion.forEach(btn => {
        btn.addEventListener("click", function(event) {
            event.preventDefault();

            // Removing previous question from screen
            newForm.remove();

            // If time is 0 or no more questions, the game ends and the user is notified
            if (quizQuestions[index] == null) {
                // Stopping the timer
                clearInterval(timer);
                return;
            }

            // Call next question
            questionHandler(index);
        })
    })

};


// Event listener on the button that starts the quiz. Once clicked,
// the first question is shown to user and the timer starts counting down
startQuiz.addEventListener("click", function() {
    document.querySelector("main").style.display = "none";
    timer = setInterval(timerHandler, 1000);
    questionHandler(index);
});