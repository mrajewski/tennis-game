document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector('#game');
    const canvasContext = canvas.getContext('2d');
    const framesPerSecond = 30;

    let paddleY = 250;
    let paddle2Y = 250;
    const paddleHeight = 100;
    const paddleWidth = 10;

    let ballX = 50;
    let ballSpeedX = 10;

    let ballY = 50;
    let ballSpeedY = 4;

    let player1Score = 0;
    let player2Score = 0;



    // paddle control by mouse
    function mousePos(evt) {
        let rect = canvas.getBoundingClientRect();
        const root = document.documentElement;
        let mouseX = evt.clientX - rect.left - root.scrollLeft;
        let mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY
        };

    }

    canvas.addEventListener('mousemove', function (evt) {
        const mouse = mousePos(evt);
        paddleY = mouse.y - (paddleHeight / 2);


    });

// reset ball after miss

    function ballReset() {
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;

    }

    function computerAI() {
        const paddle2YCenter = paddle2Y + (paddleHeight/2);
        if (paddle2YCenter < ballY-35) {
            paddle2Y +=6;

        } else if (paddle2YCenter > ballY +35 ){
            paddle2Y -= 6;
        }
    }

    function moveAll() {
        computerAI();

        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballX > canvas.width) {
            if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else{
                ballReset();
                player1Score ++;
            }

        } else if (ballX < 0) {
            if (ballY > paddleY && ballY < paddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else {
                ballReset();
                player2Score ++;
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
        rect(0, paddleY, paddleWidth, paddleHeight, 'white');

        //computer  paddle
        rect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, 'white');
        //ball
        circle(ballX, ballY, 10, 'white');


        canvasContext.fillText(`Score: ${player1Score}`,100,100);
        canvasContext.fillText(`Score: ${player2Score}`,canvas.width - 100,100)


    }


    setInterval(function () {
        moveAll();
        createAll()
    }, 1000 / framesPerSecond)


});
