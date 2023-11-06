

console.log("hit 2")



function shuffleArray(array) { //randomises the answer array
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array // returns randomised answers
}


async function randomQuestion(e){ // calls for a random question
    const arr = []
    e.preventDefault()
    console.log("Hit")
    const randIdx = Math.floor(Math.random()*(questions.length-0)) //generates a random id
    for (let i = 0; i<arr.length ; i++){ //checks if number id ha already been called
        if (randIdx != arr[i]){
            arr.push(arr[i]) //adds id to array
            const randQuestion = await fetch(`https://hip-hip.onrender.com/questions/${randIdx}`) //fetches from api
            console.log(randQuestion)
            
            if (randQuestion.ok){
                const chosen_question = await randQuestion.json();
                console.log(chosen_question)
                const answerArray = []
                // answerArray.push(chosen_question{"correct"})
                // answerArray.push(chosen_question{"incorrect1"})
                // answerArray.push(chosen_question{"incorrect2"})
                // answerArray.push(chosen_question{"incorrect3"})
                // const randomisedAnswerArray = shuffleArray(answerArray)

                // answer1.textContent = randomisedAnswerArray[0];
                // answer2.textContent = randomisedAnswerArray[1];
                // answer3.textContent = randomisedAnswerArray[3];
                // answer4.textContent = randomisedAnswerArray[4];
                }

        }
    }
    return arr
}

async function CheckAnswers(e){
    if (e.target.value === chosenQuestion[correct]){
        console.log("correct")
    }else{
        console.log("incorrect")
    }

}

const answer1 = document.querySelector("#answer1")
answer1.addEventListener("click", CheckAnswers)

const answer2 = document.querySelector("#answer2")
answer2.addEventListener("click", CheckAnswers)

const answer3 = document.querySelector("#answer3")
answer3.addEventListener("click", CheckAnswers)

const answer4 = document.querySelector("#answer4")
answer4.addEventListener("click", randomQuestion)
