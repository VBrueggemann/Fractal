var canvas = document.getElementById("fractal");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width = window.innerWidth ;
var canvasHeight = canvas.height = window.innerHeight ;
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);


var iterIsUp = true;
var circIsUp = true;
var count = 32;

render()

function shuffle() {
    animate()
}
function animate() {
    requestAnimationFrame(animate);

    let maxIter = document.getElementById('maxIter');
    if (iterIsUp && parseInt(maxIter.value) < parseInt(maxIter.max)) {
        maxIter.value = 1.0 + parseInt(maxIter.value);
    } else {
        iterIsUp = false
    }
    if (!iterIsUp && parseInt(maxIter.value) > parseInt(maxIter.min)) {
        maxIter.value = parseInt(maxIter.value) - 1.0;
    } else {
        iterIsUp = true
    }

    let circ = document.getElementById('circ');
    if (circIsUp && parseFloat(circ.value) < parseFloat(circ.max)) {
        circ.value = 0.1 + parseFloat(circ.value);
    } else {
        circIsUp = false
    }
    if (!circIsUp && parseFloat(circ.value) > parseFloat(circ.min)) {
        circ.value = parseFloat(circ.value) - 0.1;
    } else {
        circIsUp = true
    }

    render()
}

function render() {
    console.log('render')
    let startPerformance = performance.now()
    var xoffset = document.getElementById('xoffset').value;
    var yoffset = document.getElementById('yoffset').value;
    var zoom = document.getElementById('zoom').value
    var width=3.5 * zoom; var height=2 * zoom;
    let max_iter = document.getElementById('maxIter').value;
    let circ = document.getElementById('circ').value;
    count = parseInt(document.getElementById('count').value);
    for (px=0; px < canvasWidth; px++) {
        for (py=0; py < canvasHeight; py++) {
            var x0 = (px / canvasWidth) * width + (xoffset - 2.5);
            var y0 = (py / canvasHeight) * height + (yoffset - 1);
            let x = 0;
            let y = 0;
            var iter = 0;

            while ((x*x + y*y) < circ && iter < max_iter) {
                var x_temp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = x_temp;
                iter++;
            }

            var rgb = hToRgb(iter/max_iter);
            drawPixel(px, py, rgb[0], rgb[1], rgb[2], 255);
        }
    }
    ctx.putImageData (canvasData, 0, 0);
    document.getElementById('performance').innerText = performance.now() - startPerformance
    console.log('render Fin')
}



// Draw single pixel to the imageData //
function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

//Convert hue value to rgb
function hToRgb(h){
    if (h == 1)
        return [0,0,0];

    var i = Math.floor(h * count);
    return [i%count+100, i%count+110, i%count+200]
}