// script.js
document.addEventListener('DOMContentLoaded', () => {
    const startStopBtn = document.getElementById('startStopBtn');
    const indicator = document.getElementById('indicator');
    const message = document.getElementById('message');
    const points = document.getElementById('points');
    let interval;
    let movingRight = true;
    let isRunning = false;

    function startGame() {
        if (isRunning) {
            stopGame();
            return;
        }

        isRunning = true;
        startStopBtn.textContent = 'Stop';
        message.textContent = '';
        points.style.display = 'none';
        let position = 0;

        interval = setInterval(() => {
            if (movingRight) {
                position += 5;
                if (position >= 280) {
                    movingRight = false;
                }
            } else {
                position -= 5;
                if (position <= 0) {
                    movingRight = true;
                }
            }
            indicator.style.left = `${position}px`;
        }, 50);
    }

    function stopGame() {
        clearInterval(interval);
        isRunning = false;
        startStopBtn.textContent = 'Start';

        const indicatorPosition = indicator.getBoundingClientRect();
        const targetPosition = document.querySelector('.target').getBoundingClientRect();

        if (
            indicatorPosition.left >= targetPosition.left &&
            indicatorPosition.right <= targetPosition.right
        ) {
            message.textContent = 'Success! You hit the target!';
            showPoints();
        } else {
            message.textContent = 'Try again!';
        }
    }

    function showPoints() {
        points.style.display = 'block';
        points.classList.add('points-animation');
        setTimeout(() => {
            points.style.display = 'none';
        }, 1000);
    }

    startStopBtn.addEventListener('click', startGame);
});
