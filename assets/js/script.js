let start = document.getElementById('start');
// rules div
let rules = document.getElementById('rules');
// exit button
let quitBtn = document.getElementById('quit');
// start button clicked
function openPopup(){
    start.classList.add('inactive');//hides start button
    rules.classList.add('active'); // shows rules of quiz div
}
start.addEventListener('click', openPopup, false);

// hides rules div, quitBtn clicked
function closePopup(){
    rules.classList.remove('active');
    start.classList.remove('inactive');//shows start button
}
quitBtn.addEventListener('click', closePopup, false);
//continue button
let continueBtn = document.getElementById('continue');

// user registration div
let userReg = document.getElementById('register');

let rForm = document.getElementById('register-form');

let username = document.getElementById('username');

// popup registration div,clicking continueBtn
function userRegistration(){
    userReg.classList.add('show');//shows div
    rules.classList.remove('active');//hides
    start.classList.add('inactive');//hides
}
continueBtn.addEventListener('click', userRegistration, false);

//thank you div/button
let welcome = document.getElementById('welcome');
// thank you button 
let thankYouBtn = document.getElementById('thank-you');

// submit form to collect username & save to local storage
rForm.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log(username.value);
    localStorage.setItem('username', username.value);
    const  user = localStorage.getItem('username');
    document.getElementById('user').textContent = user;
    welcome.classList.add('active');//show
    userReg.classList.remove('show');//hide
    
});

// quiz div
let quiz = document.getElementById('quiz');
// Start Quiz after registration and welcome message.
function goQuiz(){
    welcome.classList.remove('active');//hide
    start.classList.remove('active');//hide
    quiz.classList.add('active');//show
    // count down begins once question is loaded.
    countTime(timer);
    //show question with answers
    loadQuestion(index);
    questCounter(questC);
 }
// thankYouBtn.addEventListener('click', goQuiz, false);
// timer
let timeSec = document.getElementById('timer-sec');
// question section
let questions = document.getElementById('quiz-questions');
// next button
let totalQ = document.getElementById('total');
let nextQ = document.getElementById('nextQ');

//answer option buttons
let options = document.getElementsByClassName('option');

// feed back
let feedBack = document.getElementById('feed-back');
 
// define variables for timer & correct answers & quiz level
let qLevelTime = [15,10,10];
let level = [0,1];// 1st & 2nd level of quiz
let qlevel;
let index = 0;
let timer = qLevelTime[0];
let interval = 0;
let counter;
let correct = 0;
let questC = 1;

qlevel = level[0];

//footer question of questions
function questCounter(questC){
    
    let qTag = `<span><p>${questC++}</p> of <p>${DzQuiz[qlevel].length}</p>Questions</span>`;
    totalQ.innerHTML = qTag;
}

// timer function
function countTime(timer){
    counter = setInterval(timmer, 1000);
    function timmer(){
        timeSec.textContent = timer;
        timer--;
        if (timer < 0) {
            clearInterval(counter);
            timeSec.textContent = "00";
        }
    }
}


// load Questions
function loadQuestion(index){
    let quesTag = `<div class="questions">
    <span id="question-num">${DzQuiz[qlevel][index].num +'.'}</span>
    <span id="question-text">${DzQuiz[0][index].question}</span></div>
    <div class="option-list">
                    <div class="option">
                        <span id="answer1" class="answers">${DzQuiz[qlevel][index].choices[0]}</span>
                        <div class="icon"></div>
                    </div>
                    <div class="option">
                        <span id="answer2" class="answers">${DzQuiz[0][index].choices[1]}</span>
                        <div class="icon"></div>
                    </div>
                    <div class="option">
                        <span id="answer3" class="answers">${DzQuiz[qlevel][index].choices[2]}</span>
                        <div class="icon"></div>
                    </div>
                    <div class="option">
                        <span id="answer4" class="answers">${DzQuiz[qlevel][index].choices[3]}</span>
                        <div class="icon"></div>
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
    clearInterval(counter);
    let userAnswer = answ.textContent;
    let corTag = `<i class="fas fa-check"></i>`;
    let incorTag = `<i class="fas fa-times"></i>`;
    let correctAns = DzQuiz[qlevel][index].answer;
   
    if (userAnswer.trim() == correctAns.trim()) {
        console.log('correct');
        correct++;
        answ.lastElementChild.innerHTML = corTag;
        answ.classList.remove('option');
        answ.classList.add('correct');
    } else {
        console.log('incorrect')
        answ.lastElementChild.innerHTML = incorTag;
        answ.classList.add('incorrect');
        //if incorrect answer automatically show correct answer
        for (let i = 0; i < options.length; i++) {
            if (options[i].textContent.trim() == correctAns.trim()) {
                options[i].setAttribute('class','option correct');
                options[i].lastElementChild.innerHTML = corTag;
            }
            
        }
    }
    //
    localStorage.setItem('correctAnswer', correct);

     //stop timer
     clearInterval(interval);
    // disable all  options after user's choice
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');  
    }
   
    nextQ.style.display = 'block';

}


// next button clicked
function nextQuestion(){
    localStorage.setItem('username', username.value);
    const  user = localStorage.getItem('username');
    const correctAnswer = localStorage.getItem('correctAnswer');
    let feedtag;
    if (correctAnswer >= 5) {
        feedtag = `
        <i class="fas fa-trophy"></i>
        <h4>Hi ${user} you have completed the quiz</h4>
        <h4 id="points">You got ${correctAnswer} out of 10</h4>
        <button id="exit" onclick="returnHome()">Quit Quiz</button>
        <button id="move-up" onclick="quizLevel2()">Next Level</button>`;
        
    } else {
        feedtag = `<i class="fas fa-meh-rolling-eyes"></i>
            <h4>Hi ${user} you have completed the quiz</h4>
            <h4 id="points">You got ${correctAnswer} out of 10</h4>
            <button id="exit" onclick="returnHome()">Quit Quiz</button>
            <button id="start-again">Start Again</button>`; 
    }
    

    if (index < DzQuiz[qlevel].length - 1) {
        index++;
        questC++;
        loadQuestion(index);
        questCounter(questC);
        clearInterval(counter);
        countTime(timer);
        nextQ.style.display = 'none';
    } else {
        quiz.classList.remove('active');
        start.classList.remove('active');
        feedBack.innerHTML = feedtag;
        feedBack.classList.add('reveal');
        // console.log('questions completed');
    }
}

let moveUp = document.getElementById('move-up');

function quizLevel2(){
    feedBack.classList.remove('reveal');
    // start.classList.remove('active');
    // start.classList.add('inactive');
    quiz.classList.add('active');//show
    qlevel = level[1];
    timer = qLevelTime[1];
    questC = 1;
    index = 0;
    //questCounter(questC);
    //loadQuestion(index);
    //goQuiz();
    countTime(timer);
    //show question with answers
    loadQuestion(index);
    questCounter(questC);
    optionSelected(answ);
    //quiz.classList.add('active');
    
}

let exitBtn = document.getElementById('exit');

// exit quiz and return back to start page
function returnHome(){
    feedBack.classList.remove('reveal');
    start.classList.remove('inactive');
    start.classList.add('active');
}

exitBtn.addEventListener('click', returnHome, false);



    

