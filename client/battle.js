//randomQuestion();
// health tracking section 
//const difficulty = require("./hub") 
const urlparams = new URLSearchParams(window.location.search) 
let difficultyNewValue = urlparams.get('difficulty');

// const urlparamsMedium = new URLSearchParams(window.location.search) 
// difficultyNewValue = urlparamsMedium.get('difficulty');

console.log(difficultyNewValue);


//let value = document.getElementById("symbolEasy")
//let newValue = value.getAttribute("data-value")
//console.log(newValue)

let Hval = 0
let Sval = 0
if (difficultyNewValue === "easy"){ //if easy
    Hval = 50 //sets damage multipliers
    Sval = 10
    console.log("Difficulty is easy")
} else if (difficultyNewValue === "medium"){
    Hval = 30
    Sval = 20
    console.log("Difficulty is medium")
}else if (difficultyNewValue === "hard"){
    Hval = 20
    Sval = 30
    console.log("Difficulty is hard")
}else{
    Hval = 10
    Sval = 35
    console.log("Difficulty is bosss")
}
// // let currentHealthH = document.getElementById("henryHealth")
// let currentHealthS = document.getElementById("studentHealth")
let currentHealthH = document.getElementById("henryHealth")
let currentHealthS = document.getElementById("studentHealth")
// let currentHealthH.value = 100 //sets health for both student and henry as global variables
// let currentHealthS.value = 100
const setHenryHealth  = function(val){ //updates henry's health 
     //gets value of henry health from html
    currentHealthH.value = currentHealthH.value - val //updates health dependent on difficulty
}
const setStudentHealth  = function(val){ //same as above but for student
    
    currentHealthS.value = currentHealthS.value - val
}
function reduceHealth(){ //temporary button for reducting health 
    setStudentHealth(Sval)
    setHenryHealth(Hval)
}

function shuffleArray(array) { //randomises the answer array
     for (let i = array.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         let temp = array[i];
         array[i] = array[j];
         array[j] = temp;
     }
//     return array // returns randomised answers
}

const questions = [];

async function loadQuestions() {
    try {
      const questionData = await fetch("http://localhost:3000/questions");
      if (!questionData.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await questionData.json();
      if (Array.isArray(data)) {
        questions.push(...data);
      } else {
        throw new Error("Invalid data received from the API");
      }
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

let i = 1 
const answerOptions = [];
let selectedQuestion = null

async function loadNextQuestion() {
    if (questions.length === 0) {
      // If no questions are loaded, load some questions
      await loadQuestions();
    }
  
    const randIdx = Math.floor(Math.random() * questions.length);
    selectedQuestion = questions.splice(randIdx, 1)[0]; // Define selectedQuestion here
  
    questionNum.textContent = `Question ${i}`;
    i++;
    question.textContent = selectedQuestion["Question"];
  
    answerOptions.length = 0;
    answerOptions.push(
      selectedQuestion["correct"],
      selectedQuestion["incorrect1"],
      selectedQuestion["incorrect2"],
      selectedQuestion["incorrect3"]
    );
  
    shuffleArray(answerOptions); // Shuffle the answer options
  
    // Set the answer options for the current question
    answer1.textContent = answerOptions[0];
    answer2.textContent = answerOptions[1];
    answer3.textContent = answerOptions[2];
    answer4.textContent = answerOptions[3];
  }
  
const arr = []
const answerArray = []
let isAnswerSubmitted = false
let isFetchingQuestion = false;


async function CheckAnswers(e) {
    e.preventDefault();
  
    if (selectedQuestion === null) {
      console.error("No question loaded");
      return;
    }
  
    const chosenAnswer = e.target.textContent;
  
    if (chosenAnswer === selectedQuestion["correct"]) {
      console.log("Correct");
      setHenryHealth(Hval);
    } else {
      console.log("Incorrect");
      setStudentHealth(Sval);
    }
  
    if (currentHealthH.value < 1) {
      console.log("Congratulations, you beat Henry");
    } else if (currentHealthS.value < 1) {
      console.log("You suck at this");
    }
  
    // Load the next question
    await loadNextQuestion();
  }
  
  selectedQuestion = null;  
  
const answer1 = document.querySelector("#answer1")
answer1.addEventListener("click", CheckAnswers)

const answer2 = document.querySelector("#answer2")
answer2.addEventListener("click", CheckAnswers)

const answer3 = document.querySelector("#answer3")
answer3.addEventListener("click", CheckAnswers)

const answer4 = document.querySelector("#answer4")
answer4.addEventListener("click", CheckAnswers)

module.exports = {shuffleArray, CheckAnswers}
