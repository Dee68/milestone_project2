// start button
let start = document.getElementById('start');

// rules div
let rules = document.getElementById('rules');

// quiz div
let quiz = document.getElementById('quiz');
// timer
let timeDiv = document.getElementById('time');

let timeSec = document.getElementById('timer-sec');

// question section
let questions = document.getElementById('quiz-questions');
let questionNum = document.getElementById('question-num');
let questionText = document.getElementById('question-text');

// answer section
let spans = document.getElementsByClassName('answers');

let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');

// next button
let totalQ = document.getElementById('total');
let nextQ = document.getElementById('nextQ');

// user registration div
let userReg = document.getElementById('register');

let rForm = document.getElementById('register-form');

let username = document.getElementById('username');

// exit button
let exit = document.getElementById('quit');

//continue button
let continueBtn = document.getElementById('continue');

// registraion button
let register = document.getElementById('register');


//thank you div/button
let welcome = document.getElementById('welcome');

let thankYou = document.getElementById('thank-you');

//answer option buttons
let options = document.getElementsByClassName('option');

let option_list = document.getElementsByClassName('option-list');




// define variables for timer & correct answers
let index = 0;
let timer = 0;
let interval = 0;
let correct = 0;
let questC = 1;
let userAns = undefined;

//footer question of questions
function questCounter(questC){
    let qTag = `<span><p>${questC++}</p> of <p>${DzQuiz.length}</p>Questions</span>`
    totalQ.innerHTML = qTag;
}

function countDown(){
    if(timer === 20){
        clearInterval(interval);
    }else{
        timer++;
        timeSec.innerText = timer;
    }
}

//setInterval(countDown, 1000);

// let loadData = function(){
//     questionNum.innerText = index + 1+".";
//     questionText.innerText = DzQuiz[index].question;
//     answer1.innerText = DzQuiz[index].option1;
//     answer2.innerText = DzQuiz[index].option2;
//     answer3.innerText = DzQuiz[index].option3;
//     answer4.innerText = DzQuiz[index].option4;
//     // start timer
//     timer = 0;
// };
// loadData();
// load Questions
function loadQuestion(index){
    let quesTag = `<div class="questions">
    <span id="question-num"> ${DzQuiz[index].num}</span>
    <span id="question-text">${DzQuiz[index].question}</span></div>
    <div class="option-list">
                    <div class="option">
                        <span id="answer1" class="answers">${DzQuiz[index].choices[0]}</span>
                        <div class="icon tick"><i class="fas fa-check"></i></div>
                    </div>
                    <div class="option">
                        <span id="answer2" class="answers">${DzQuiz[index].choices[1]}</span>
                        <div class="icon cross"><i class="fas fa-times"></i></div>
                    </div>
                    <div class="option">
                        <span id="answer3" class="answers">${DzQuiz[index].choices[2]}</span>
                        <div class="icon cross"><i class="fas fa-times"></i></div>
                    </div>
                    <div class="option">
                        <span id="answer4" class="answers">${DzQuiz[index].choices[3]}</span>
                        <div class="icon cross"><i class="fas fa-times"></i></div>
                    </div>
                </div>`;
questions.innerHTML = quesTag;
// user clicking an option
for (let i = 0; i < options.length; i++) {
    options[i].setAttribute('onclick', 'optionSelected(this)');
    
}

}

//user clicked an answer
function optionSelected(answ){
    let userAnswer = answ.textContent;

    let correctAns = DzQuiz[index].answer;
    
    if (userAnswer.trim() == correctAns.trim()) {
        console.log('correct');
        answ.classList.remove('option');
        answ.classList.add('correct');
    } else {
        console.log('incorrect')
        answ.classList.add('incorrect');
    }
    // disable all other options after user's choice
   

}

function openPopup(){
    start.classList.add('inactive');
    rules.classList.add('active');
}
//
function closePopup(){
    rules.classList.remove('active');
    start.classList.remove('inactive');
}
// popup registration div
function userRegistration(){
    userReg.classList.add('show');
    rules.classList.remove('active');
    start.classList.add('inactive');
}

// submit form to collect username
rForm.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log(username.value);
    localStorage.setItem('username', username.value);
    const  user = localStorage.getItem('username');
    document.getElementById('user').textContent = user;
    welcome.classList.add('active');
    userReg.classList.remove('show');
    
});
// next button clicked
function nextQuestion(){
    if (index < DzQuiz.length) {
        index++;
        questC++;
        loadQuestion(index);
        questCounter(questC);
    } else {
        console.log('questions completed');
    }
}
// Start Quiz after registration and welcome message.
function goQuiz(){
   welcome.classList.remove('active');
   start.classList.remove('active');
   quiz.classList.add('active');
   // count down begins once question is loaded.
   interval = setInterval(countDown, 1000);
   loadQuestion(index);
   questCounter(questC);
}



    

