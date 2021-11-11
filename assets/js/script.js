const numOfAnswers = 4;
const penalty = 10;
const correctAnswer = "Correct!";
const wrongAnswer = "Wrong!";

var timeLeft = 75;
var startQuiz = document.querySelector(".start-quiz");
var timer = null;
var index = 0;
var userAnswer = "";


// Array of objects that contain questions, answers, and correct answer
let quizQuestions = [{
        "question": "String values must be enclosed within what?",
        "possibleAnswers": ["Curly Brackets", "Double Quotations", "Asterisks", "Commas"],
        "correctAnswer": "Double Quotations"
    },
    {
        "question": "In JavaScript, we assign values to variables by which operator?",
        "possibleAnswers": ["===", "+", "=", "=="],
        "correctAnswer": "="
    },
    {
        "question": "Which of the following is NOT a JavaScript Data Type?",
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
        "correctAnswer": "All of the Above"
    },
    {
        "question": "Which of the following is not a valid JavaScript variable name?",
        "possibleAnswers": ["Num", "userStatus", "Break", "myString"],
        "correctAnswer": "Break"
    },
    {
        "question": "Which method returns the character at the specified index?",
        "possibleAnswers": ["characterAt()", "getCharAt()", "charAt()", "None of the above"],
        "correctAnswer": "charAt()"
    },
    {
        "question": "What are the types of Pop up boxes available in JavaScript? ",
        "possibleAnswers": ["Alert", "Prompt", "Confirm", "All of the above"],
        "correctAnswer": "All of the above"
    }
]

var timerHandler = function() {
    timeLeft--;
    document.getElementById("countdown").innerHTML = timeLeft;
    // If time is 0 the game ends
    if (timeLeft === 0) {
        // Stopping the timer
        clearInterval(timer);
        return;
    }
};

// Function that handles the question and answer output on browser
var questionHandler = function(index, userAnswer) {
    var newForm = document.createElement("form");
    newForm.className = "center";
    document.body.appendChild(newForm);
    var newQuest = document.createElement("h1");
    newQuest.textContent = quizQuestions[index].question;
    newForm.appendChild(newQuest);

    for (var count = 0; count < numOfAnswers; count++) {
        var possibleAnswer = document.createElement("button");
        possibleAnswer.setAttribute("id", "btn");
        possibleAnswer.textContent = (count + 1 + ". " + quizQuestions[index].possibleAnswers[count]);
        newForm.appendChild(possibleAnswer);
    }

    // Creating a breaker line that separates possible answers from the userAnswer
    var breaker = document.createElement("hr");
    newForm.appendChild(breaker);

    // Creating an element that captures the result of the answered question
    var status = document.createElement("h2");
    status.textContent = userAnswer
    newForm.appendChild(status);

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

            // Checking user answer
            if (btn.textContent.slice(3) === quizQuestions[index - 1].correctAnswer) {
                userAnswer = correctAnswer;

            } else {
                // Penalizing user when answering a question wrong
                timeLeft -= penalty;
                userAnswer = wrongAnswer;
                // Updating the time displayed in browser
                document.getElementById("countdown").innerHTML = timeLeft;

            }

            // If time is 0 or no more questions, the game ends and the user is notified
            if (quizQuestions[index] == null) {
                // Stopping the timer
                clearInterval(timer);
                return;
            }

            // Call next question
            questionHandler(index, userAnswer);
        })
    })

};


// Event listener on the button that starts the quiz. Once clicked,
// the first question is shown to user and the timer starts counting down
startQuiz.addEventListener("click", function() {
    document.querySelector("main").style.display = "none";
    timer = setInterval(timerHandler, 1000);
    questionHandler(index, userAnswer);
});