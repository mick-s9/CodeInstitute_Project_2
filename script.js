
const quizDataLevel1 = [
  {
    question: "Who is known as the 'Father of Electronic Music'?",
    options: ["Kraftwerk", "Brian Eno", "Jean-Michel Jarre", "Karlheinz Stockhausen"],
    correctAnswer: 3,
  },
  {
    question: "Which electronic music duo is famous for their helmets?",
    options: ["Daft Punk", "The Chemical Brothers", "Justice", "Disclosure"],
    correctAnswer: 0,
  },
  {
    question: "Which electronic music festival takes place annually in Belgium?",
    options: ["Tomorrowland", "Ultra Music Festival", "Coachella", "Electric Daisy Carnival (EDC)"],
    correctAnswer: 0,
  },
  {
    question: "Who produced the song 'Strobe'?",
    options: ["Skrillex", "deadmau5", "Avicii", "Calvin Harris"],
    correctAnswer: 1,
  },
];

const quizDataLevel2 = [
  {
    question: "Which artist is known for pioneering the genre of 'Chillwave'?",
    options: ["Flume", "Jamie xx", "Tycho", "Washed Out"],
    correctAnswer: 3,
  },
  {
    question: "Which electronic music subgenre incorporates elements of dub reggae?",
    options: ["Drum and Bass", "Dubstep", "Trance", "Techno"],
    correctAnswer: 1,
  },
  {
    question: "The 'TB-303' is a famous synthesizer primarily used in which genre?",
    options: ["House", "Techno", "Trance", "Drum and Bass"],
    correctAnswer: 0,
  },
  {
    question: "Which electronic music artist has a signature helmet resembling a mouse head?",
    options: ["Deadmau5", "Marshmello", "Zedd", "Martin Garrix"],
    correctAnswer: 0,
  },
];

const quizDataLevel3 = [
  {
    question: "What year was the Roland TR-808 drum machine released?",
    options: ["1979", "1980", "1981", "1982"],
    correctAnswer: 1,
  },
  {
    question: "The genre 'Detroit Techno' originated in which U.S. city?",
    options: ["Chicago", "New York", "Detroit", "Los Angeles"],
    correctAnswer: 2,
  },
  {
    question: "Which electronic music artist released the album 'Random Access Memories'?",
    options: ["Deadmau5", "Justice", "Daft Punk", "Disclosure"],
    correctAnswer: 2,
  },
  {
    question: "The 'Ableton Live' software is commonly used for what purpose in music production?",
    options: ["Video Editing", "Graphic Design", "Audio Recording", "Music Composition"],
    correctAnswer: 3,
  },
];

let currentQuestion = 0;
let score = 0;
let currentLevel = 1;
let level1IncorrectAnswers = 0;
let level2IncorrectAnswers = 0;
let level3IncorrectAnswers = 0;

const startQuiz = () => {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter a username.");
    return;
  }

  document.getElementById("rules-game").innerText = "Hello " + username + "! Welcome to the Electronic Music Quiz. Careful, you can only get 1 wrong answer for each level"
  document.querySelector(".user-section").style.display = "none";
  document.querySelector(".quiz-section").style.display = "block";
  document.querySelector(".level-section").style.display = "block";
  document.getElementById("level").innerText = currentLevel;

  // Reset the score and incorrect answer counters at the start of each level
  score = 0;
  if (currentLevel === 1) {
    level1IncorrectAnswers = 0;
  } else if (currentLevel === 2) {
    level2IncorrectAnswers = 0;
  } else if (currentLevel === 3) {
    level3IncorrectAnswers = 0;
  }

  showQuestion();
};

const showQuestion = () => {
  const questionElement = document.getElementById("question");
  const optionsElements = document.querySelectorAll(".options button");
  const feedbackElement = document.querySelector(".feedback");
  const feedbackTextElement = document.getElementById("feedback-text");

  const currentQuizData = getCurrentQuizData();

  if (!currentQuizData) {
    questionElement.innerText = "Quiz completed!";
    document.getElementById("rules-game").style.display = "none";
    optionsElements.forEach((option) => (option.style.display = "none"));
    feedbackElement.style.display = "none";
    document.getElementById("score-section").style.display = "none";
    document.getElementById("level-section").style.display = "none";
    return;
  }

  const currentQuiz = currentQuizData[currentQuestion];
  questionElement.innerText = currentQuiz.question;

  optionsElements.forEach((option, index) => {
    option.innerText = currentQuiz.options[index];
    option.style.display = "block";
  });

  feedbackElement.style.display = "none";
};

const getCurrentQuizData = () => {
  if (currentLevel === 1) {
    return quizDataLevel1;
  } else if (currentLevel === 2) {
    return quizDataLevel2;
  } else if (currentLevel === 3) {
    return quizDataLevel3;
  }
  return null;
};

const checkAnswer = (selectedOption) => {
  const currentQuizData = getCurrentQuizData();
  if (!currentQuizData) {
    return;
  }

  const currentQuiz = currentQuizData[currentQuestion];
  const feedbackElement = document.querySelector(".feedback");
  const feedbackTextElement = document.getElementById("feedback-text");
  const optionsElements = document.querySelectorAll(".options button");

  if (selectedOption === currentQuiz.correctAnswer) {
    score++;
    document.getElementById("correct-img").style.display = "block";
    document.getElementById("incorrect-img").style.display = "none";
    feedbackTextElement.innerText = "Correct!";
    feedbackTextElement.style.color = "#2ecc71";

  } else {
    document.getElementById("correct-img").style.display = "none";
    document.getElementById("incorrect-img").style.display = "block";
    feedbackTextElement.innerText = "Incorrect!";
    feedbackTextElement.style.color = "#e74c3c";

    // Track incorrect answers for each level
    if (currentLevel === 1) {
      level1IncorrectAnswers++;
    } else if (currentLevel === 2) {
      level2IncorrectAnswers++;
    } else if (currentLevel === 3) {
      level3IncorrectAnswers++;
    }
  }

  optionsElements.forEach((option) => (option.disabled = true));
  feedbackElement.style.display = "block";

  // Check if the player loses the game
  if (level1IncorrectAnswers > 1 || level2IncorrectAnswers > 1 || level3IncorrectAnswers > 1) {
    gameOver(false); // false indicates losing the game
  } else {
    displayScore();
  }
};

const nextQuestion = () => {
  const feedbackElement = document.querySelector(".feedback");
  const optionsElements = document.querySelectorAll(".options button");

  optionsElements.forEach((option) => (option.disabled = false));
  feedbackElement.style.display = "none";
  currentQuestion++;

  const currentQuizData = getCurrentQuizData();
  if (!currentQuizData || currentQuestion >= currentQuizData.length) {
    // If all questions in the current level are completed
    if (currentLevel === 1) {
      // If in Level 1, check if the player qualifies for Level 2
      if (level1IncorrectAnswers <= 1) {
        currentLevel = 2;
        currentQuestion = 0;
        level1IncorrectAnswers = 0; // Reset the counter for Level 1
        score = 0; // Reset the score at the start of Level 2
      } else {
        // If the player does not qualify for Level 2, check if the player qualifies for Level 3
        if (level2IncorrectAnswers <= 1) {
          currentLevel = 3;
          currentQuestion = 0;
          level2IncorrectAnswers = 0; // Reset the counter for Level 2
          score = 0; // Reset the score at the start of Level 3
        } else {
          // If the player does not qualify for Level 3, the game ends
          currentLevel = 0;
        }
      }
    } else if (currentLevel === 2) {
      // If in Level 2, check if the player qualifies for Level 3
      if (level2IncorrectAnswers <= 1) {
        currentLevel = 3;
        currentQuestion = 0;
        level2IncorrectAnswers = 0; // Reset the counter for Level 2
        score = 0; // Reset the score at the start of Level 3
      } else {
        // If the player does not qualify for Level 3, the game ends
        currentLevel = 0;
      }
    } else if (currentLevel === 3) {
      // If in Level 3, the game ends
      currentLevel = 0;
    }
  }

  document.getElementById("level").innerText = currentLevel;
  showQuestion();
  displayScore(); // Update the score display at the start of each level
};

const displayScore = () => {
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = score;
};

const gameOver = (isWin) => {
  document.getElementById("question").innerText = isWin ? "You Win!" : "Game Over!";
  document.querySelector(".options").style.display = "none";
  document.querySelector(".feedback").style.display = "none";
  document.querySelector(".level-section").style.display = "none";
  document.getElementById("score").innerText = isWin ? "You Win" : "You Lose";
  document.getElementById("rules-game").style.display = "none";
};
