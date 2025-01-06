// Retrieve flashcards from local storage
const contentArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];


// DOM elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const generateButton = document.getElementById("gen-btn");


// State variables
let currentQuestionIndex = 0;


// Convert flashcards into quiz data format
const quizData = contentArray.map((item, index) => {
   const shuffledAnswers = shuffleAnswers(item.my_answer, contentArray, index);
   return {
       question: item.my_question,
       answers: shuffledAnswers.answers,
       correctIndex: shuffledAnswers.correctIndex // Store correct answer index after shuffling
   };
});


// Function to shuffle answers and include some incorrect ones
function shuffleAnswers(correctAnswer, flashcards, currentIndex) {
   let allAnswers = [correctAnswer];
   let correctIndex = 0;


   // Add other answers from flashcards if available
   flashcards.forEach((item, index) => {
       if (index !== currentIndex && allAnswers.length < 4) {
           allAnswers.push(item.my_answer);
       }
   });


   // Shuffle the answers
   for (let i = allAnswers.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
   }


   // Find the new index of the correct answer
   correctIndex = allAnswers.indexOf(correctAnswer);


   return { answers: allAnswers, correctIndex };
}


// Function to load a question
function loadQuestion() {
   if (quizData.length === 0) {
       questionElement.textContent = "No flashcards available to generate questions.";
       answerButtonsElement.innerHTML = "";
       return;
   }


   // Clear previous answers
   answerButtonsElement.innerHTML = "";


   // Get the current question
   const question = quizData[currentQuestionIndex];
   questionElement.textContent = question.question;


   // Create buttons for each answer
   question.answers.forEach((answer, index) => {
       const button = document.createElement("button");
       button.textContent = answer;
       button.classList.add("btn");
       button.addEventListener("click", () => checkAnswer(index));
       answerButtonsElement.appendChild(button);
   });
}


// Function to check the user's answer
function checkAnswer(selectedIndex) {
   const question = quizData[currentQuestionIndex];
   if (selectedIndex === question.correctIndex) {
       alert("Correct!");
   } else {
       alert(`Wrong! The correct answer was: ${question.answers[question.correctIndex]}`);
   }
}


// Function to generate a new question
function generateQuestion() {
   if (quizData.length === 0) {
       loadQuestion();
       return;
   }


   // Pick a random question index
   currentQuestionIndex = Math.floor(Math.random() * quizData.length);
   loadQuestion();
}


// Event listener for the generate button
generateButton.addEventListener("click", generateQuestion);


// Load the first question when the page loads
generateQuestion();
