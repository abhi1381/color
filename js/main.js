
var numSq = 12;
var colors = [];
var square = document.querySelectorAll(".square div");
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var reset = document.querySelector("#reset_");
var mode = document.querySelectorAll(".mode");
var header = document.querySelector("#section2 h1");

_init();

function _init() {
    
    setMode();
    setSquares();
    Reset();
}

function setMode() {
    for (var i = 0; i < mode.length; i++) {
        mode[i].addEventListener("click", function () {
            mode[0].classList.remove("selected");
            mode[1].classList.remove("selected");
            mode[2].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent == "Easy") {
                numSq = 4;
            } else if(this.textContent == "Medium") {
                numSq = 8;
            } else {
                numSq = 12;
            }
            Reset();
        });
    }
}

function setSquares() {
    for (i = 0; i < square.length; i++) {

        //add click listeners to squares
        square[i].addEventListener("click", function () {
            //grab color of clicked squares
            var clickedColor = this.style.background;
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                reset.textContent = "PLAY AGAIN";
                header.style.background = clickedColor;
            } else {
                this.style.background = "#ffffff";
                messageDisplay.textContent = "KEEP GUESSING YOU CAN DO IT!";
            }
        });
    }
}

function Reset() {
    colors = generateRandomColors(numSq);
    pickedColor = pickColor();
    messageDisplay.textContent = "";
    colorDisplay.textContent = pickedColor;
    reset.textContent = "NEW COLORS";
    for (var i = 0; i < square.length; i++) {
        if (colors[i]) {
            square[i].style.display = "block";
            square[i].style.background = colors[i];
        } else {
            square[i].style.display = "none";
        }
    }
    header.style.background = "white";
}


reset.addEventListener("click", function (e) {
    e.preventDefault();
    Reset();
});



function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < square.length; i++) {
        //change each color to match given color
        square[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(n) {
    var array = [];
    for (var index = 0; index < n; index++) {
        randomColors();
        array.push(randomColors());
    }
    return array;
}


function randomColors() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    return "rgb("+ r + ", " + g + ", " + b + ")";
} 