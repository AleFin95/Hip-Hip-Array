const questions = require("../API")

const arr = []


const newArr = randomQuestion(arr)

async function randomQuestion(arr){
    const randIdx = Math.floor(Math.random()*(questions.length-0))
    for (let i = 0; i<arr.length ; i++){
        if (randIdx != arr[i]){
            arr.append(arr[i])
            const chosen_question = await fetch(`https://hip-hip.onrender.com/questions/${randIdx}`)
            console.log(chosen_question)
        }
    }
    return arr
}
console.log(newArr)
