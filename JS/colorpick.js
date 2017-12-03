function onload(){
var btBitmaps = document.getElementById("btBitmaps");
btBitmaps.addEventListener("click",iniciar,true);
function iniciar(){

    var canvas = document.getElementById("areaPieChart");
    var ctx = canvas.getContext('2d');
    var color = document.getElementById('color');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //var data2 = imageData.data;

    //var invertbtn = document.getElementById('invertbtn');
    //invertbtn.addEventListener('click', grayscale);
    var invertbtn = document.getElementById('invertbtn');
    invertbtn.addEventListener("click", invert,true);
    var grayscalebtn = document.getElementById('grayscalebtn');
    grayscalebtn.addEventListener("click", grayscale,true);
    canvas.addEventListener('mousemove', pick);

    canvas.width = 300;
    canvas.height = 300;

    function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ', ' + data[1] +
                ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    color.style.background =  rgba;
    color.textContent = rgba;
    }

    var data2 = imageData.data;

    function invert() {
        for (var i = 0; i < data2.length; i += 4) {
        data2[i]     = 255 - data2[i];     // red
        data2[i + 1] = 255 - data2[i + 1]; // green
        data2[i + 2] = 255 - data2[i + 2]; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    }
    
    function grayscale() {

        for (var i = 0; i < data2.length; i += 4) {
        var avg = (data2[i] + data2[i + 1] + data2[i + 2]) / 3;
        data2[i]     = avg; // red
        data2[i + 1] = avg; // green
        data2[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };
}
}
window.addEventListener("load",onload,true);