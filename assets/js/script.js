const numOfAnswers = 4;
const penalty = 10;
const correctAnswer = "Correct!";
const wrongAnswer = "Wrong!";

var timeLeft = 75;
var startQuiz = document.querySelector(".start-quiz");
var timer = null;
var index = 0;
var userAnswer = "";
var highScoreId = 0;
var highScores = [];
var highScoreObj = {
    initials: "",
    score: "",
    id: ""
}
var userInput = "";


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
        "possibleAnswers": ["num", "userStatus", "Break", "myString"],
        "correctAnswer": "Break"
    },
    {
        "question": "What are the types of pop up boxes available in JavaScript? ",
        "possibleAnswers": ["Alert", "Prompt", "Confirm", "All of the Above"],
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
        document.querySelector("form").remove();
        gameOver();
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
                if (timeLeft < 0) {
                    timeLeft = 0;
                }
                userAnswer = wrongAnswer;
                // Updating the time displayed in browser
                document.getElementById("countdown").innerHTML = timeLeft;

            }

            // If time is 0 or no more questions, the game ends and the user is notified
            if (quizQuestions[index] == null) {
                // Stopping the timer
                clearInterval(timer);
                gameOver();
                return;
            }

            // Call next question
            questionHandler(index, userAnswer);
        })
    })

};

// Function to save high score of user to local storage
var saveScores = function() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
};

// Function that retrieves high scores that were saved in local storage
var loadScores = function() {

    // Place the local storage contents into a local variable
    var savedScores = localStorage.getItem("highScores");

    if (savedScores === null) {
        return false;
    }

    // Parsing the string back into an object
    savedScores = JSON.parse(savedScores);

    for (var i = 0; i < savedScores.length; i++) {

        highScoreObj = {
            initials: savedScores[i].initials,
            score: savedScores[i].score,
            id: savedScores[i].id
        }
        highScores.push(highScoreObj);
    }

    highScoreId = savedScores.length;
}


var gameOver = function() {

    var finalForm = document.createElement("form");
    finalForm.className = "game-over";
    document.body.appendChild(finalForm);

    var finalMessage = document.createElement("h1");
    finalMessage.textContent = "All Done!"
    finalForm.appendChild(finalMessage);

    var userScore = document.createElement("p");
    userScore.textContent = "Your final score is " + timeLeft + ".";
    finalForm.appendChild(userScore);

    var enterInitials = document.createElement("p");
    enterInitials.textContent = "Enter initials:";
    finalForm.appendChild(enterInitials);

    var userInput = document.createElement("input");
    userInput.setAttribute("id", "user-init");
    userInput.setAttribute("type", "text");
    enterInitials.appendChild(userInput);

    var submitScore = document.createElement("button");
    submitScore.setAttribute("id", "submit-btn");
    submitScore.textContent = "Submit";
    enterInitials.appendChild(submitScore);

    submitScore.addEventListener("click", function(event) {
        event.preventDefault();
        var userInput = document.getElementById("user-init").value;
        highScoreObj = {
            initials: userInput,
            score: timeLeft,
            id: highScoreId
        };

        highScores.push(highScoreObj);
        highScoreId++;
        saveScores();
        highScoreList();
    });

};

var highScoreList = function() {
    if (timeLeft === 75) {
        document.querySelector("main").style.display = "none";
        document.querySelector("header").style.display = "none";
    } else {
        document.querySelector("main").style.display = "none";
        document.querySelector("header").style.display = "none";
        document.querySelector("form").remove();
    }

    var list = document.createElement("form");
    list.setAttribute("id", "high-score-list")
    list.className = "game-over";
    document.body.appendChild(list);

    var highScoreHeading = document.createElement("h1");
    highScoreHeading.textContent = "High Scores";
    list.appendChild(highScoreHeading);

    var orderedList = document.createElement("ol");
    list.appendChild(orderedList);

    highScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

    for (var i = 0; i < highScores.length; i++) {
        var highScoreEntry = document.createElement("li");
        highScoreEntry.setAttribute("padding", "5px");
        highScoreEntry.textContent = highScores[i].initials + " - " + highScores[i].score;
        orderedList.appendChild(highScoreEntry);
    }

    var newSection = document.createElement("div");
    newSection.setAttribute("flex-direction", "row");
    list.appendChild(newSection);

    var escape = document.createElement("button");
    escape.setAttribute("id", "go-back-btn");
    escape.textContent = "Go back";
    newSection.appendChild(escape);

    escape.addEventListener("click", function() {
        location.reload();
    })

    var clearScores = document.createElement("button");
    clearScores.setAttribute("id", "clear-btn");
    clearScores.textContent = "Clear high scores";
    newSection.appendChild(clearScores);

    clearScores.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.clear();
        orderedList.remove();

    });


}

// Event listener on the button that starts the quiz. Once clicked,
// the first question is shown to user and the timer starts counting down
startQuiz.addEventListener("click", function() {
    document.querySelector("main").style.display = "none";
    timer = setInterval(timerHandler, 1000);
    questionHandler(index, userAnswer);
});

loadScores();