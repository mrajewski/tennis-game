document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector('#game');
    const canvasContext = canvas.getContext('2d');
    let ballX=50;



    function createAll() {
        ballX += 10;
        console.log(ballX);
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0,0,canvas.width,canvas.height);
        canvasContext.fillStyle = 'red';
        canvasContext.fillRect(10,50,50,20);
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(ballX,200,50,25);

    }

    createAll();
    createAll();
    createAll();






});
