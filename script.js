
const prevGuessList = document.querySelector('#previous-guess-display')
const scoreDisplay = document.querySelector('#score-display')
const enteredGuess = document.querySelector('.guess-input-actual')
const guessDescriber = document.querySelector(".guess-describer")
const disabledBtn = document.querySelectorAll('.game-start-btn')
const numSubmit = document.querySelector('#submit')
const guessDeclaration = document.querySelector('#evaluated-declaration')
const displayGuess = document.querySelector('.return-guess-text')
const clearBtn = document.querySelector('#clearInput')
const resetBtn = document.querySelector('#reset-btn')

var inputNumber
var guessArray = []
var points = 0
var numToGuess
var minNum = 1
var maxNum = 10
var evalAgainst = Math.floor(Math.random() * maxNum)+1
var score = 0

console.log('score', score)
console.log('max', maxNum)
console.log('random', evalAgainst)

//functions
function evaluateGuess(numToEval,evalAgainst) {
   if (numToEval === evalAgainst) {
    guessDeclaration.innerText = "BOOM!"
    guessDeclaration.style.visibility = "visible"
    displayGuess.style.visibility = "visible"
    displayGuess.innerText = numToEval
  } if (numToEval > evalAgainst) {
    guessDeclaration.innerText = "You Guessed Too High"
    guessDeclaration.style.visibility = "visible"
    displayGuess.style.visibility = "visible"
    displayGuess.innerText = numToEval
  } else if (numToEval < evalAgainst) {
    guessDeclaration.innerText = "You Guessed Too Low"
    guessDeclaration.style.visibility = "visible"
    displayGuess.style.visibility = "visible"
    displayGuess.innerText = numToEval
  }
  // activateButton()
}


function scoreRange() {
  if (inputNumber === evalAgainst) {
    score += 20
    maxNum += 20
    document.querySelector('#range-display').innerText = maxNum
    document.querySelector('#score-display').innerText = " " + score
    randoNum()
    console.log(evalAgainst,'after guess btn click')
  } else if (inputNumber !== evalAgainst) {
    score -= 3
    document.querySelector('#score-display').innerText = score
  }
}

function randoNum() {
  evalAgainst = Math.floor(Math.random() * maxNum)+1
}

function activateButton(inputNumber) {
  disabledBtn.forEach(function(button) {
    if (inputNumber >= minNum && inputNumber <= maxNum) {
      button.disabled = false
    } else {
      button.disabled = true
  }})
}

enteredGuess.addEventListener("keyup", function() {
  inputNumber = parseInt(this.value)
  activateButton(inputNumber)
})

numSubmit.addEventListener("click", function() {
  numSubmit.disabled = true
  enteredGuess.value = null
  var numToEval = parseInt(inputNumber)

  if (guessArray.length < 5) {
    guessDescriber.style.visibility = "visible"
    prevGuessList.style.visibility = "visible"
    guessArray.unshift(numToEval)
    var guessList = guessArray.toString()
    prevGuessList.innerText = " " +  guessList
  } else if (guessArray.length === 5) {
    guessArray.pop()
    guessArray.unshift(numToEval)
    guessList = guessArray.toString()
    prevGuessList.innerText = " " + guessList
  }

  evaluateGuess(numToEval, evalAgainst)
  scoreRange()
  inputNumber = null
})

clearBtn.addEventListener('click', function() {
  clearBtn.disabled = true
  numSubmit.disabled = true
  displayGuess.innerText = "Guess a number less than " + maxNum
  inputNumber = null
  enteredGuess.value = null
  guessDeclaration.style.visibility = "hidden"
  guessDescriber.style.visibility = "hidden"

  if (guessArray.length > 0) {
    guessArray.splice(0, guessArray.length)
    prevGuessList.innerText = null
  }
})

resetBtn.addEventListener('click', function() {
  score = 0
  guessArray.splice(0, guessArray.length)
  prevGuessList.innerText = null
  guessDescriber.style.visibility = "hidden"
  scoreDisplay.innerText = null
  enteredGuess.value = null
  displayGuess.innerText = "Guess a number less than 10"
  guessDeclaration.style.visibility = "hidden"
  randoNum()
})
