const words = [
  "javascript",
  "programming",
  "hangman",
  "developer",
  "openai",
  "react",
  "node",
  "express",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingAttempts = 6;
const wordDisplay = document.getElementById("wordDisplay");
// let hasGuessedLetter = false;
const guessedLettersDisplay = document.getElementById("guesses");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const hangman = document.getElementById("hangman-body").childNodes;
const childNodes = [];

for (let i = 0; i < hangman.length; i++) {
  const childNode = hangman[i];
  if (childNode.nodeType === 1 && childNode.tagName === "DIV") {
    childNodes.push(childNode);
  }
}
console.log(childNodes);

function setWinBackgroundColor() {
  document.body.style.backgroundColor = "green";
}

function setLossBackgroundColor() {
  document.body.style.backgroundColor = "red";
}

function updateWordDisplay() {
  let displayWord = "";
  for (const letter of selectedWord) {
    if (guessedLetters.includes(letter)) {
      displayWord += letter;
    } else {
      displayWord += "_";
    }
  }
  wordDisplay.textContent = displayWord.split("").join(" ");
}

function checkWin() {
  if (wordDisplay.textContent === selectedWord) {
    wordDisplay.textContent = "Congratulations! You won!";
    setWinBackgroundColor();
  }
}

function checkLoss() {
  if (remainingAttempts <= 0) {
    wordDisplay.textContent = "Game over! You lost.";
    setLossBackgroundColor();
  }
}

function guessLetter() {
  const input = guessInput.value.toLowerCase().trim();
  console.log(input);
  if (input.length === 1) {
    const letter = input[0];
    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);
      guessedLettersDisplay.textContent = `${guessedLetters.join(", ")}`;
      if (!selectedWord.includes(letter)) {
        childNodes[6 - remainingAttempts].classList.remove("none");
        remainingAttempts--;
      }
      updateWordDisplay();
      checkWin();
      checkLoss();
      //   hasGuessedLetter = true;
    }
  }
  guessInput.value = ""; // Clear the input field
}

// Initialize the game
updateWordDisplay();

guessButton.addEventListener("click", guessLetter);
