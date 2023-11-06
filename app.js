//require("dotenv").config()
const cors = require('cors');
const logger = require("./logger");
const express = require('express');

const app = express();
const port = 3000;

app.use(logger);
const questions = require("./API")

app.get('/', (req, res) => {
  res.send('Welcome to the history game!');
});

app.get('/questions', (req, res) => {
  res.send(questions);
})

app.get('/questions/random', (req, res) => {
  //const randIdx = 8;
  const randIdx = Math.floor(Math.random()*(questions.length-0))
  res.send(questions[randIdx]);
})

app.get('/questions/:id', (req, res) => {
  const idx = req.params.id;
  if(isNaN(idx)){
      res.status(404).send("Error - Not a number!")
  }else if(idx >= 0 && idx <= questions.length-1){
      res.send(questions[idx]);
  }else{
      res.status(404).send("Error - ID out of range")
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});