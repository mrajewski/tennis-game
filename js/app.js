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
    const winnigScore = 3;

    let showWinScreen = false;





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

    // rematch

    function handleMouseClick (e){
        if(showWinScreen){
            player1Score = 0;
            player2Score = 0;
            showWinScreen = false;
        }


    }


    canvas.addEventListener('click',handleMouseClick);

// reset ball after miss

    function ballReset() {
        if (player1Score>= winnigScore || player2Score>=winnigScore){
            showWinScreen = true;
        }
        ballSpeedX = -ballSpeedX;
        // ballSpeedY = 0;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;

    }

    function computerAI() {
        const paddle2YCenter = paddle2Y + (paddleHeight/2);
        if (paddle2YCenter < ballY-35) {
            paddle2Y +=7;

        } else if (paddle2YCenter > ballY +35 ){
            paddle2Y -= 7;
        }
    }

    function moveAll() {
        if (showWinScreen === true){
            return;
        }
        computerAI();

        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballX > canvas.width) {
            if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                const deltaY = ballY - (paddle2Y + paddleHeight/2);
                ballSpeedY = deltaY *0.35
            } else{
                player1Score ++; // must be before reset
                ballReset();
            }

        } else if (ballX < 0) {
            if (ballY > paddleY && ballY < paddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                const deltaY = ballY - (paddleY + paddleHeight/2);
                ballSpeedY = deltaY *0.35
            } else {
                player2Score ++; // must be before reset
                ballReset();

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

    function createNet() {
        for (let i=10;i<canvas.height; i+=40){
            rect(canvas.width/2-1, i, 2, 20, 'white')
        }


    }


    function createAll() {

        //black background on canvas
        rect(0, 0, canvas.width, canvas.height, 'black');

        if (showWinScreen){
            canvasContext.fillStyle = 'white';
            if ( player1Score >= winnigScore){
                canvasContext.fillText(`Left Player Won!`,350,200);
            }else if (player2Score>= winnigScore){
                canvasContext.fillText(`Right Player Won!`,350,200);
            }

            canvasContext.fillText(`Click to continue`,350,500);
            return;
        }

        createNet();

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
