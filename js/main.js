//var game = {};

//game.init =function () {
  //  setMode();
    //setSquares();
   // Reset();
//};

//game.init();

var numSq = 6;
var colors = [];
var header = document.querySelector("header");
var square = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var reset = document.querySelector("#reset_");
var mode = document.querySelectorAll(".mode");


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
            this.classList.add("selected");
            if (this.textContent == "EASY") {
                numSq = 3;
            } else {
                numSq = 6;
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
                this.style.background = "#232323";
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
    header.style.background = "rgb(121, 238, 66)";
}
/*easy.addEventListener("click",function () {
    hard.classList.remove("selected");
    easy.classList.add("selected");
    numSq = 3;    
    colors = generateRandomColors(numSq);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < square.length; i++) {
        if (colors[i]) {
            square[i].style.background = colors[i];
        }else {
            square[i].style.display = "none";
        }
    }
    
});

hard.addEventListener("click", function () {
    easy.classList.remove("selected");
    hard.classList.add("selected");
    colors = generateRandomColors(numSq);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < square.length; i++) {
        square[i].style.background = colors[i];
        square[i].style.display = "block";        
    }
}); */

reset.addEventListener("click", function () {
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