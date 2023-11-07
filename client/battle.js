//randomQuestion();
// health tracking section 
//const difficulty = require("./hub") 
const urlparams = new URLSearchParams(window.location.search) 
let difficultyNewValue = urlparams.get('difficulty');

const urlparamsMedium = new URLSearchParams(window.location.search) 
difficultyNewValue = urlparamsMedium.get('difficulty');

console.log(difficultyNewValue);


//let value = document.getElementById("symbolEasy")
//let newValue = value.getAttribute("data-value")
//console.log(newValue)

let Hval = 0
let Sval = 0
if (difficultyNewValue === "easy"){ //if easy
    Hval = 50 //sets damage multipliers
    Sval = 10
} else if (difficultyNewValue === "medium"){
    Hval = 30
    Sval = 20
}else if (difficultyNewValue === "hard"){
    Hval = 20
    Sval = 30
}else{
    Hval = 10
    Sval = 35
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
    return array // returns randomised answers
}



const arr = []
const answerArray = []
let i = 1;
async function CheckAnswers(e){
    e.preventDefault()
    const questionData = await fetch(`http://localhost:3000/questions`);
    //const questions = await fetch(`https://hip-hip.onrender.com/questions/${randIdx}`)
    const questions = await questionData.json();
    //console.log(questions.length);
    const randIdx = Math.floor(Math.random()*(questions.length-0)) //generates a random id

    const chosenAnswer = e.target.outerText;


    if(arr.includes(randIdx)){ //checks players health
        CheckAnswers(e);
    }
    else {
        arr.push(randIdx) //adds id to array
        const randQuestion = await fetch(`http://localhost:3000/questions/${randIdx}`) //fetches from api
        const finalRandomQuestion = await randQuestion.json(); //converts to json
        console.log(finalRandomQuestion)
        
        const correctAnswer = finalRandomQuestion["correct"] //identifies correct anser 

        answerArray.push(finalRandomQuestion["correct"])   //add each question to an array
        answerArray.push(finalRandomQuestion["incorrect1"])
        answerArray.push(finalRandomQuestion["incorrect2"])
        answerArray.push(finalRandomQuestion["incorrect3"])

        const randomisedAnswerArray = shuffleArray(answerArray) //randomise question order

        questionNum.textContent = (`Question ${i}`); //counts and increments question number
        i++;
        question.textContent = finalRandomQuestion["Question"]  //sets question in html

        if (chosenAnswer === correctAnswer){ //checks if chosen answer is correct or not 
            console.log("correct")
            setHenryHealth(Hval)
        }else{
            console.log("incorrect")
            setStudentHealth(Sval)
        }
        if(currentHealthH.value < 1){ //checks henrys health 
            console.log("Congratulations you beat Henry");
        } else if (currentHealthS.value < 1){
            console.log("you suck at this")
        }

        answer1.textContent = randomisedAnswerArray[0];
        answer2.textContent = randomisedAnswerArray[1];
        answer3.textContent = randomisedAnswerArray[2];
        answer4.textContent = randomisedAnswerArray[3];
        answerArray.length = 0;

    } 
}

const answer1 = document.querySelector("#answer1")
//const array = randomQuestion();
answer1.addEventListener("click", CheckAnswers)

const answer2 = document.querySelector("#answer2")
answer2.addEventListener("click", CheckAnswers)

const answer3 = document.querySelector("#answer3")
answer3.addEventListener("click", CheckAnswers)

const answer4 = document.querySelector("#answer4")
answer4.addEventListener("click", CheckAnswers)

module.exports = {shuffleArray, CheckAnswers}
