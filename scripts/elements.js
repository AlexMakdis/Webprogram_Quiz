 const CORRECT_BONUS = 10;
 const MAX_QUESTIONS = 10;

 const question = document.getElementById("question");
 const answers = Array.from(document.getElementsByClassName("choice-text"));
 const questionNumber = document.getElementById("questionNumber");
 const progressBarFull = document.getElementById("progressBarFull");

 export {
     CORRECT_BONUS,
     MAX_QUESTIONS,
     question,
     answers,
     questionNumber,
     progressBarFull
 }