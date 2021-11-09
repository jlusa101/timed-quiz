var timeLeft = 75;


var timer = function() {
    timeLeft--;
    if (timeLeft === 0) {
        clearInterval(timethis);
        alert("game over!");
    }
    document.getElementById("countdown").innerHTML = timeLeft;
};

var timethis = setInterval(timer, 1000);