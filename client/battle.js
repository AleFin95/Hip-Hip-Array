//randomQuestion();

function shuffleArray(array) { //randomises the answer array
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array // returns randomised answers
}


async function randomQuestion(){ // calls for a random question

    const arr = []
    console.log("Hit")
    const questionData = await fetch(`http://localhost:3000/questions`);
    //const questions = await fetch(`https://hip-hip.onrender.com/questions/${randIdx}`)
    const questions = await questionData.json();
    //console.log(questions.length);
    const randIdx = Math.floor(Math.random()*(questions.length-0)) //generates a random id

    if (!arr.includes(randIdx)){
        arr.push(randIdx) //adds id to array
        const randQuestion = await fetch(`http://localhost:3000/questions/${randIdx}`) //fetches from api
        const finalRandomQuestion = await randQuestion.json();
        console.log(finalRandomQuestion)
        
        const answerArray = []
        answerArray.push(finalRandomQuestion["correct"])   //add each question to an array
        answerArray.push(finalRandomQuestion["incorrect1"])
        answerArray.push(finalRandomQuestion["incorrect2"])
        answerArray.push(finalRandomQuestion["incorrect3"])

        console.log(answerArray);
        const randomisedAnswerArray = shuffleArray(answerArray)
        console.log(randomisedAnswerArray);

        answer1.textContent = randomisedAnswerArray[0];
        answer2.textContent = randomisedAnswerArray[1];
        answer3.textContent = randomisedAnswerArray[2];
        answer4.textContent = randomisedAnswerArray[3];
        //return answerArray["correct"];
        }
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

    if(arr.length === questions.length){
        console.log("GAME DONE");
    } 
    else if(arr.includes(randIdx)){
        CheckAnswers(e);
    }
    else {
        arr.push(randIdx) //adds id to array
        const randQuestion = await fetch(`http://localhost:3000/questions/${randIdx}`) //fetches from api
        const finalRandomQuestion = await randQuestion.json();
        console.log(finalRandomQuestion)
        
        const correctAnswer = finalRandomQuestion["correct"]

        answerArray.push(finalRandomQuestion["correct"])   //add each question to an array
        answerArray.push(finalRandomQuestion["incorrect1"])
        answerArray.push(finalRandomQuestion["incorrect2"])
        answerArray.push(finalRandomQuestion["incorrect3"])

        const randomisedAnswerArray = shuffleArray(answerArray)

        questionNum.textContent = i;
        i++;
        question.textContent = finalRandomQuestion["Question"] 

        if (chosenAnswer === correctAnswer){
            console.log("correct")
        }else{
            console.log("incorrect")
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