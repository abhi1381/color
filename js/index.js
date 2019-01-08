var canvas = document.querySelector("#scene"),
    ctx = canvas.getContext("2d"),
    particles = [],
    amount = 0,
    mouse = {
        x: 0,
        y: 0
    },
    radius = 0.65;

var colors = ["#468966","#FFB03B","#ff0000", "#efff09", "#ff9409", "#0066ff","#ff00b3", "#4c00ff","#ffe923"];

var textInput = document.querySelector("#textInput");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x, y) {
    this.x = Math.random() * ww;
    this.y = Math.random() * wh;
    this.dest = {
        x: x,
        y: y
    };
    this.r = Math.random() * 5 + 2;
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.94;

    this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function () {

    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    var a = this.x - mouse.x;
    var b = this.y - mouse.y;

    var distance = Math.sqrt(a * a + b * b);
    if (distance < (radius * 70)) {
        this.accX = (this.x - mouse.x) / 100;
        this.accY = (this.y - mouse.y) / 100;
        this.vx += this.accX;
        this.vy += this.accY;
    }

}

function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onTouchMove(e) {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}

function onTouchEnd(e) {
    mouse.x = -9999;
    mouse.y = -9999;
}



function initScene() {
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold " + (ww / 5) + "px \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(textInput.value, ww / 2, wh / 2);

    var data = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    // wrapText(ctx,textInput.value,ww/2,wh/2,"560px","1.6");

    particles = [];
    for (var i = 0; i < ww; i += Math.round(ww / 150)) {
        for (var j = 0; j < wh; j += Math.round(ww / 150)) {
            if (data[((i + j * ww) * 4) + 3] > 150) {
                particles.push(new Particle(i, j));
            }
        }
    }
    amount = particles.length;

}

function onMouseClick() {
    radius++;
    if (radius === 5) {
        radius = 0;
    }
}

function render(a) {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }
};

// function wrapText(context, text, x, y, maxWidth, lineHeight) {

//     var words = text.split(' '),
//         line = '',
//         lineCount = 0,
//         i,
//         test,
//         metrics;

//     for (i = 0; i < words.length; i++) {
//         test = words[i];
//         metrics = context.measureText(test);
//         while (metrics.width > maxWidth) {
//             // Determine how much of the word will fit
//             test = test.substring(0, test.length - 1);
//             metrics = context.measureText(test);
//         }
//         if (words[i] != test) {
//             words.splice(i + 1, 0, words[i].substr(test.length))
//             words[i] = test;
//         }

//         test = line + words[i] + ' ';
//         metrics = context.measureText(test);

//         if (metrics.width > maxWidth && i > 0) {
//             context.fillText(line, x, y);
//             line = words[i] + ' ';
//             y += lineHeight;
//             lineCount++;
//         } else {
//             line = test;
//         }
//     }

//     context.fillText(line, x, y);
// }


textInput.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);
