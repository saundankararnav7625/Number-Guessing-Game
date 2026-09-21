# Number Guessing Game

The computer picks a secret number between 1 and 100. You guess, and the game tells you whether to go higher or lower. A bar at the top shows which numbers are still possible and shrinks with every guess. Your best score is saved in your browser.

Built with plain HTML, CSS, and JavaScript. No libraries, no build step.

## Play it

1. Download or clone this repo.
2. Open `index.html` in your browser.

## How it works

- `script.js` picks a random number with `Math.random()`.
- Each guess is compared to the secret number. If it's wrong, the game narrows the possible range (`low` and `high`) and updates the bar.
- The best score is stored with `localStorage`.

## Files

- `index.html`: page structure
- `style.css`: layout and the range bar
- `script.js`: game logic

## Ideas for next steps

- Add difficulty levels (1 to 10, 1 to 100, 1 to 1000)
- Limit the number of guesses
- Add "warm" and "cold" hints based on how close the guess is
- Turn it into a quiz game with a list of questions and a score

## Live demo

Add your GitHub Pages link here once it's published.
