const instructionModal = document.getElementById("instructionModal");
const startButton = document.getElementById("startQuiz");
const quizModal = document.getElementById("quizModal");
const resultModal = document.getElementById("resultModal");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("finalScore");
const congratsMessage = document.getElementById("congratsMessage");
const questionDisplay = document.getElementById("question");
const optionsDisplay = document.getElementById("options");
const timerDisplay = document.getElementById("timer");
const playAgainButton = document.getElementById("playAgain");

let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let timeLeft = 20;

startButton.addEventListener("click", () => {
  startQuiz();
});
playAgainButton.addEventListener("click", () => {
  reStartQuiz();
});

function reStartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 20;
  quizModal.style.display = "block";
  resultModal.style.display = "none";
  showQuestion();
  startTimer();
}

function startQuiz() {
  instructionModal.style.display = "none";
  quizModal.style.display = "block";
  showQuestion();
  startTimer(); // Set your time limit here (20 seconds)
}

async function fetchQuizData() {
  // Fetch quiz data from the Open Trivia Database API
  await fetch("https://opentdb.com/api.php?amount=50&category=9")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      questions = data.results;
    })
    .catch((error) => {
      console.error("Error fetching quiz data:", error);
    });
}

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = currentQuestion.question;

    optionsDisplay.innerHTML = "";

    const allOptions = currentQuestion.incorrect_answers.concat(
      currentQuestion.correct_answer
    );

    shuffleArray(allOptions);

    allOptions.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.className = "answer";
      button.addEventListener("click", () => checkAnswer(option));
      optionsDisplay.appendChild(button);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correct_answer) {
    score += 10;
    scoreDisplay.textContent = score;
  }

  currentQuestionIndex++;
  showQuestion();
}

function startTimer() {
  const timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    } else {
      updateTimerDisplay();
      timeLeft--;
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
}

function endQuiz() {
  quizModal.style.display = "none";
  resultModal.style.display = "block";
  finalScoreDisplay.textContent = score;
  if (score === 0) {
    congratsMessage.textContent = "Better luck next time!";
  } else {
    congratsMessage.textContent = "Congratulations!";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

fetchQuizData();
