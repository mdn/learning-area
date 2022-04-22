let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const timeLimit = document.querySelector('.timeLimit');
let startButton = document.querySelector('.startButton');
let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;
let timer;

guessField.disabled = true;

startButton.addEventListener("click", startGame);

function startGame() {
    startButton.disabled = true;
    guessField.disabled = false;
    timeLimit.textContent = 100;
    timer=setInterval("countDown()",1000);
}

function countDown() {
    let sec=timeLimit.textContent;
    sec=parseInt(sec);
    tmWrite(sec-1);
}

function tmWrite(int) {
    timeLimit.textContent=int;
    if (int<=0) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '';
        setGameOver();
    }
}

guessSubmit.disabled = true;
guessField.addEventListener("input", stateHandle);

function stateHandle() {
    if(guessField.value === "") {
        guessSubmit.disabled = true;
    } else {
        guessSubmit.disabled = false;
    }
}

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!' ;
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
    guessSubmit.disabled = true;
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    clearInterval(timer);
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
    startGame();
}