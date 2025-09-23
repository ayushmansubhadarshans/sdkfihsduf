let score = 0;
let gameInterval;
let isGameRunning = false;
let currentActiveMole = null;


const scoreElement = document.getElementById('score');
const winMessage = document.getElementById('win-message');
const restartBtn = document.getElementById('restart-btn');
const holes = document.querySelectorAll('.hole');

function getRandomHole() {
    const randomIndex = Math.floor(Math.random() * holes.length);
    return holes[randomIndex];
}

function showMole() {
    if (currentActiveMole) {
        currentActiveMole.classList.remove('active');
    }
    
  
    currentActiveMole = getRandomHole();
    currentActiveMole.classList.add('active');
}

function updateScore() {
    score++;
    scoreElement.textContent = score;
    
    
    if (score >= 5) {
        endGame();
        showWinMessage();
    }
}

function showWinMessage() {
    winMessage.classList.remove('hidden');
}

function hideWinMessage() {
    winMessage.classList.add('hidden');
}

function startGame() {
    if (isGameRunning) return;
    
    isGameRunning = true;
    hideWinMessage();
    
    
    showMole();
    
    gameInterval = setInterval(showMole, 1000);
}

function endGame() {
    isGameRunning = false;
    
    
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    
  
    if (currentActiveMole) {
        currentActiveMole.classList.remove('active');
        currentActiveMole = null;
    }
}

function restartGame() {
   
    endGame();
    score = 0;
    scoreElement.textContent = score;
    hideWinMessage();
    
    
    startGame();
}

function handleMoleClick(event) {
    const clickedHole = event.target;
    
    
    if (!isGameRunning || !clickedHole.classList.contains('active')) {
        return;
    }
    
    
    clickedHole.classList.remove('active');
    updateScore();
    
    
    currentActiveMole = null;
}


holes.forEach(hole => {
    hole.addEventListener('click', handleMoleClick);
});

restartBtn.addEventListener('click', restartGame);


document.addEventListener('DOMContentLoaded', function() {
    startGame();
});