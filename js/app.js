document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector('#game');
    const canvasContext = canvas.getContext('2d');
    const framesPerSecond = 30;

    let paddleY = 250;
    const paddleHeight = 100;

    let ballX = 50;
    let ballSpeedX = 10;

    let ballY = 50;
    let ballSpeedY = 4;
    


    // paddle control by mouse
    function mousePos(evt) {
        let rect = canvas.getBoundingClientRect();
        const root = document.documentElement;
        let mouseX = evt.clientX - rect.left - root.scrollLeft;
        let mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x:mouseX,
            y:mouseY
        };

    }

    canvas.addEventListener('mousemove',function (evt) {
        const mouse = mousePos(evt);
        paddleY = mouse.y - (paddleHeight/2);


    });

// reset ball after miss

    function ballReset() {
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2;
        ballY = canvas.height/2;

    }

    function moveAll() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballX > canvas.width) {
            ballSpeedX = -ballSpeedX;

        } else if (ballX < 0) {
            if (ballY>paddleY && ballY< paddleY + paddleHeight){
                ballSpeedX = -ballSpeedX;
            }else {
                ballReset()

            }
        } else if (ballY < 0) {
            ballSpeedY = -ballSpeedY;

        } else if (ballY > canvas.height) {
            ballSpeedY = -ballSpeedY;

        }
    }

    function rect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);

    }

    function circle(centerX, centerY, radius, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();


    }

    function createAll() {
        //black background on canvas
        rect(0, 0, canvas.width, canvas.height, 'black');

        //left player paddle
        rect(0, paddleY, 10, paddleHeight, 'white');

        //ball
        circle(ballX, ballY, 10, 'white');


    }


    setInterval(function () {
        moveAll();
        createAll()
    }, 1000 / framesPerSecond)


});
