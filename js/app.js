document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector('#game');
    const canvasContext = canvas.getContext('2d');
    const framesPerSecond = 30;
    let ballX = 50;
    let ballSpeedX =5;


    function moveAll() {
        ballX += ballSpeedX;
        if(ballX>800){
            ballSpeedX = -ballSpeedX;

        }
    }

    function createAll() {
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(0, 50, 10, 100);

        //ball
        canvasContext.fillStyle = 'red';
        canvasContext.fillRect(ballX, 200, 10, 10);
    }


    setInterval(function () {
        moveAll();
        createAll()
    }, 1000 / framesPerSecond)


});
