// Number guessing game.
// The computer picks a secret number. You guess, and it tells you
// whether to go higher or lower until you find it.

const MIN = 1;
const MAX = 100;

const form = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess");
const guessButton = document.querySelector("#guess-button");
const feedback = document.querySelector("#feedback");
const newGameButton = document.querySelector("#new-game");
const rangeFill = document.querySelector("#range-fill");
const rangeLabel = document.querySelector("#range-label");
const stats = document.querySelector("#stats");
const guessList = document.querySelector("#guess-list");

let secret;    // the number to find
let low;       // smallest number still possible
let high;      // largest number still possible
let attempts;  // how many guesses so far
let gameOver;

// Best score is saved in the browser so it survives a page refresh.
function getBestScore() {
  try {
    return Number(localStorage.getItem("bestScore")) || null;
  } catch {
    return null;
  }
}

function saveBestScore(score) {
  try {
    localStorage.setItem("bestScore", String(score));
  } catch {
    // Storage can be blocked. The game still works without it.
  }
}

function updateStats() {
  const best = getBestScore();
  const bestText = best ? ` Best: ${best}.` : "";
  stats.textContent = `Guesses: ${attempts}.${bestText}`;
}

function updateRange() {
  const total = MAX - MIN + 1;
  rangeFill.style.marginLeft = `${((low - MIN) / total) * 100}%`;
  rangeFill.style.width = `${((high - low + 1) / total) * 100}%`;
  rangeLabel.textContent = `The number is between ${low} and ${high}.`;
}

function startGame() {
  secret = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  low = MIN;
  high = MAX;
  attempts = 0;
  gameOver = false;

  guessList.innerHTML = "";
  feedback.textContent = "";
  feedback.classList.remove("win");
  newGameButton.hidden = true;
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.value = "";
  guessInput.focus();

  updateRange();
  updateStats();
}

function addToList(guess, result) {
  const item = document.createElement("li");
  item.textContent = `${guess}: ${result}`;
  guessList.prepend(item); // newest guess on top
}

function endGame() {
  gameOver = true;
  guessInput.disabled = true;
  guessButton.disabled = true;
  newGameButton.hidden = false;
  newGameButton.focus();

  const best = getBestScore();
  if (!best || attempts < best) saveBestScore(attempts);
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  if (gameOver) return;

  const guess = parseInt(guessInput.value, 10);

  if (Number.isNaN(guess) || guess < MIN || guess > MAX) {
    feedback.textContent = `Enter a whole number from ${MIN} to ${MAX}.`;
    return;
  }

  attempts++;

  if (guess === secret) {
    feedback.textContent = `Correct! You found ${secret} in ${attempts} ${attempts === 1 ? "guess" : "guesses"}.`;
    feedback.classList.add("win");
    addToList(guess, "correct");
    low = high = secret;
    endGame();
  } else if (guess < secret) {
    feedback.textContent = "Too low. Try a higher number.";
    addToList(guess, "too low");
    low = Math.max(low, guess + 1);
  } else {
    feedback.textContent = "Too high. Try a lower number.";
    addToList(guess, "too high");
    high = Math.min(high, guess - 1);
  }

  updateRange();
  updateStats();

  if (!gameOver) {
    guessInput.value = "";
    guessInput.focus();
  }
});

newGameButton.addEventListener("click", startGame);

startGame();
