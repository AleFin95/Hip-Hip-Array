const newForm = document.querySelector("#createQuestion")
newForm.addEventListener("submit", createQuestion)

async function createQuestion(e){
  e.preventDefault()  
  
  const data = {
    question: e.target.question.value,
    correct: e.target.correct.value,
    incorrect1: e.target.incorrect1.value,
    incorrect2: e.target.incorrect2.value,
    incorrect3: e.target.incorrect3.value,
  }

  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}

const response = await fetch ("http://localhost:3000/questions/create", options)

  if(response.ok){
    e.target.question.value=""
    e.target.correct.value=""
    e.target.incorrect1.value=""
    e.target.incorrect2.value=""
    e.target.incorrect3.value=""
    alert ("Question successfully added!")
  } 
}
