function shuffleArray(array) { //randomises the answer array
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array // returns randomised answers
}


// async function randomQuestion(e){ // calls for a random question

//     const arr = []
//     e.preventDefault()
//     console.log("Hit")
//     const questionData = await fetch(`http://localhost:3000/questions`);
//     //const questions = await fetch(`https://hip-hip.onrender.com/questions/${randIdx}`)
//     const questions = await questionData.json();
//     //console.log(questions.length);
//     const randIdx = Math.floor(Math.random()*(questions.length-0)) //generates a random id

//     if (!arr.includes(randIdx)){
//         arr.push(randIdx) //adds id to array
//         const randQuestion = await fetch(`http://localhost:3000/questions/${randIdx}`) //fetches from api
//         const finalRandomQuestion = await randQuestion.json();
//         console.log(finalRandomQuestion)
        
//         const answerArray = []
//         answerArray.push(finalRandomQuestion["correct"])   //add each question to an array
//         answerArray.push(finalRandomQuestion["incorrect1"])
//         answerArray.push(finalRandomQuestion["incorrect2"])
//         answerArray.push(finalRandomQuestion["incorrect3"])

//         console.log(answerArray);
//         const randomisedAnswerArray = shuffleArray(answerArray)
//         console.log(randomisedAnswerArray);

//         answer1.textContent = randomisedAnswerArray[0];
//         answer2.textContent = randomisedAnswerArray[1];
//         answer3.textContent = randomisedAnswerArray[3];
//         answer4.textContent = randomisedAnswerArray[4];
//         //return answerArray["correct"];
//         }
// }

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

    if (!arr.includes(randIdx)){
        console.log("hit 5");
        arr.push(randIdx) //adds id to array
        const randQuestion = await fetch(`http://localhost:3000/questions/${randIdx}`) //fetches from api
        const finalRandomQuestion = await randQuestion.json();
        console.log(finalRandomQuestion)
        
        answerArray.push(finalRandomQuestion["correct"])   //add each question to an array
        answerArray.push(finalRandomQuestion["incorrect1"])
        answerArray.push(finalRandomQuestion["incorrect2"])
        answerArray.push(finalRandomQuestion["incorrect3"])

        console.log(answerArray);
        const randomisedAnswerArray = shuffleArray(answerArray)
        console.log(randomisedAnswerArray);

        answer1.textContent = randomisedAnswerArray[0];
        answer2.textContent = randomisedAnswerArray[1];
        answer3.textContent = randomisedAnswerArray[3];
        answer4.textContent = randomisedAnswerArray[4];
        //return answerArray["correct"];

        answerArray.length = 0;

        questionNum.textContent = i;
        i++;
        console.log();
        question.textContent = finalRandomQuestion["Question"]

        console.log(e.target.outerText);
        if (e.target.outerText === answerArray[0]){
            console.log("correct")
        }else{
            console.log("incorrect")
        }
        }
        
        if(arr.length === questions.length){
            console.log("GAME DONE");
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

