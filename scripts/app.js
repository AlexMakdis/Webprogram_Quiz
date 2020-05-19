import {
  CORRECT_BONUS,
  MAX_QUESTIONS,
  question,
  answers,
  questionNumber,
  progressBarFull
} from './elements.js';



let currentQuestion = {};
let correctAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];

/*
*************************************************
(commit voor het examen)
Quiz
*************************************************
*/


/*
fetch api
*************************************************
*/
fetch(
    'https://opentdb.com/api.php?amount=10&type=multiple'
  )
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];

      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1; //Random place of correctanswer

      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });


      return formattedQuestion;
    });
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

/*
Start game
*************************************************
*/

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

/*
Get new Question: 
  |
  ->Question counter
*************************************************
*/
var timer = setInterval(getNewQuestion, 10000) // TIMER WERKT

function getNewQuestion() {
   
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      //go to the end page
      return window.location.assign("/endScore.html");
    }
  
  

  questionCounter++;
  questionNumber.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`; //question counter

  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;


  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = `${currentQuestion.question}`;

  answers.forEach(choice => {
    const number = choice.dataset["number"];

    choice.innerHTML = `${currentQuestion["choice" + number]}`;

  });

  availableQuesions.splice(questionIndex, 1); // Don't get same question
  correctAnswers = true;
};

/*
Events
*************************************************
*/
answers.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!correctAnswers) return;

    correctAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});



/*
Add score
*************************************************
*/
function incrementScore(num) {
  score += num;
};