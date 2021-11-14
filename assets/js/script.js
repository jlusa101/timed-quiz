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
        "correctAnswer": "All of the Above"
    }
]

// Function that handles the quiz timer, this function is set to be called once a 
// second. The timer on browser gets decremented each time
// When the timer runs out, game is over
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

// Function that informs the user that the game has ended, shows the score and 
// requires user input to enter their initials to be saved on the high score list
var gameOver = function() {

    // Creating a new form element
    var finalForm = document.createElement("form");
    finalForm.className = "game-over";
    document.body.appendChild(finalForm);

    // Creating a new heading and attaching it to the form
    var finalMessage = document.createElement("h1");
    finalMessage.textContent = "All Done!"
    finalForm.appendChild(finalMessage);

    // Creating a new p element that shows the score and attaching it to the form
    var userScore = document.createElement("p");
    userScore.textContent = "Your final score is " + timeLeft + ".";
    finalForm.appendChild(userScore);

    // Creating another p element that instructs the user
    var enterInitials = document.createElement("p");
    enterInitials.textContent = "Enter initials:";
    finalForm.appendChild(enterInitials);

    // Creating an input element where the user may enter their initials
    var userInit = document.createElement("input");
    userInit.setAttribute("id", "user-init");
    userInit.setAttribute("type", "text");
    enterInitials.appendChild(userInit);

    // Creating a button that submits user initials and score to the high score board
    var submitScore = document.createElement("button");
    submitScore.setAttribute("id", "submit-btn");
    submitScore.textContent = "Submit";
    enterInitials.appendChild(submitScore);

    // Adding an event listener to the button
    // In this function, we capture user input and create an object that includes
    // their initials, score, and an unique id
    submitScore.addEventListener("click", function(event) {
        event.preventDefault();
        var userInput = document.getElementById("user-init").value;
        highScoreObj = {
            initials: userInput,
            score: timeLeft,
            id: highScoreId
        };

        // Pushing the object into an array
        highScores.push(highScoreObj);

        // Incrementing the high score id
        highScoreId++;
        saveScores();
        highScoreList();
    });

};

// Function that creates the high score list to be viewed on the browser
var highScoreList = function() {

    // If the user clicks the link on the main page
    if (timeLeft === 75) {
        document.querySelector("main").style.display = "none";
        document.querySelector("header").style.display = "none";
    } else {
        document.querySelector("main").style.display = "none";
        document.querySelector("header").style.display = "none";
        document.querySelector("form").remove();
    }

    // Creating a new form
    var list = document.createElement("form");
    list.setAttribute("id", "high-score-list")
    list.className = "game-over";
    document.body.appendChild(list);

    // Creating a new heading to the form
    var highScoreHeading = document.createElement("h1");
    highScoreHeading.textContent = "High Scores";
    list.appendChild(highScoreHeading);

    // Creating an ordered list
    var orderedList = document.createElement("ol");
    list.appendChild(orderedList);

    // Sorting the array in a way that highest scores come first
    highScores.sort((a, b) => (a.score < b.score) ? 1 : -1);

    // Looping through the array of objects that contain initials and their score
    // and appending them on the list
    for (var i = 0; i < highScores.length; i++) {
        var highScoreEntry = document.createElement("li");
        highScoreEntry.setAttribute("padding", "5px");
        highScoreEntry.textContent = highScores[i].initials + " - " + highScores[i].score;
        orderedList.appendChild(highScoreEntry);
    }

    // Creating a div that contains two buttons
    var newSection = document.createElement("div");
    newSection.setAttribute("flex-direction", "row");
    list.appendChild(newSection);

    // Creating a button that takes the user back to main page
    var escape = document.createElement("button");
    escape.setAttribute("id", "go-back-btn");
    escape.textContent = "Go back";
    newSection.appendChild(escape);

    // Adding an event listener that takes the user back to the main page
    escape.addEventListener("click", function() {
        location.reload();
    })

    // Creating a button that clears the high score list
    var clearScores = document.createElement("button");
    clearScores.setAttribute("id", "clear-btn");
    clearScores.textContent = "Clear high scores";
    newSection.appendChild(clearScores);

    // Event listener that clears the local storage when the button is clicked
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