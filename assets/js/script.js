/*jshint esversion: 6 */

const rules = document.getElementById('rules');
const continueBtn = document.getElementById('continue');
const welcome = document.getElementById('welcome');
const thankYou = document.getElementById('thank-you');
const msg = document.getElementById('message');
const quiz = document.getElementById('quiz');
const userReg = document.getElementById('register');
const rForm = document.getElementById('register-form');
const username = document.getElementById('username');
const timeSec = document.getElementById('timer-sec');
const questNum = document.getElementById('question-num');
const questText = document.getElementById('question-text');
const totalQ = document.getElementById('total');
const nextQ = document.getElementById('nextQ');
const options = Array.from(document.getElementsByClassName('option'));
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const feedBack = document.getElementById('feed-back');
const face = document.getElementById('face');
const info = document.getElementById('info');
const points = document.getElementById('points');
const nextlevel = document.getElementById('move-up');
const playAgain = document.getElementById('start-again');
const exBtn = document.getElementById('exit');

let qLevelTime = [10,5];
let level = [0,1];
let qlevel;
let index = 0;
let timer = qLevelTime[0];
let interval = 0;
let counter;
let correct = 0;
let questC = 1;
localStorage.setItem('username', 'username');
localStorage.setItem('correctAnswer', 0);

qlevel = level[0];



function quizLevel2(){
    feedBack.classList.remove('reveal');
    quiz.classList.add('active');
    qlevel = level[1];
    timer = qLevelTime[1];
    questC = 1;
    index = 0;
    countTime(timer);
    loadQuestion(index);
    questCounter(questC);  
}

function userRegistration(){
    userReg.classList.add('show');
    rules.classList.add('inactive');
}


function validateName(){
    let regEx = /^[A-Za-z]+$/;
    if (username.value == '' || !(username.value.match(regEx))) {
        msg.classList.add('alert');
        username.focus();
        return false;
        
    } else {
        return true;
    }
}




function goQuiz(){
    welcome.classList.remove('active');
    quiz.classList.add('active');
    countTime(timer);
    loadQuestion(index);
    questCounter(questC);
 }

function questCounter(questC){
    let qTag = `<span><p>${questC++}</p> <span><p>of </p></span><p>${dzQuiz[qlevel].length}</p><span><p>Questions</p></span>`;
    totalQ.innerHTML = qTag;
}

function countTime(timer){
    counter = setInterval(timmer, 1000);
    function timmer(){
        timeSec.textContent = timer;
        timer--;
        if (timer < 0) {
            clearInterval(counter);
            timeSec.textContent = "00";
            for (let i = 0; i < options.length; i++) {
                options[i].classList.add('disabled');  
            }
        nextQ.style.display = 'block';
        }
    }
}

function loadQuestion(index){ 
    questNum.innerHTML = `${dzQuiz[qlevel][index].num +'.'}`;
    questText.innerHTML = `${dzQuiz[qlevel][index].question}`;
    answer1.innerHTML = `${dzQuiz[qlevel][index].choices[0]}`;
    answer2.innerHTML = `${dzQuiz[qlevel][index].choices[1]}`;
    answer3.innerHTML = `${dzQuiz[qlevel][index].choices[2]}`;
    answer4.innerHTML = `${dzQuiz[qlevel][index].choices[3]}`;
options.forEach(function(removeActive){
    removeActive.classList.remove('correct');
    removeActive.classList.remove('incorrect');
    removeActive.classList.remove('disabled');
    removeActive.classList.add('option');
    removeActive.lastElementChild.innerHTML = '';
});


}

options.forEach(function(option){
    option.addEventListener('click', function(){ 
    clearInterval(counter);
    let userAnswer = option.textContent;
    let corTag = `<i class="fas fa-check"></i>`;
    let incorTag = `<i class="fas fa-times"></i>`;
    let correctAns = dzQuiz[qlevel][index].answer;
   
    if (userAnswer.trim() == correctAns.trim()) {
        correct++;
        option.lastElementChild.innerHTML = corTag;
        option.classList.remove('option');
        option.classList.add('correct');
    } else {
        option.lastElementChild.innerHTML = incorTag;
        option.classList.add('incorrect');
        for (let i = 0; i < options.length; i++) {
            if (options[i].textContent.trim() == correctAns.trim()) {
                options[i].setAttribute('class','option correct');
                options[i].lastElementChild.innerHTML = corTag;
            }
            
        }
    }

     localStorage.setItem('correctAnswer', correct);
    
     clearInterval(interval);

    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');  
    }
   
    nextQ.style.display = 'block';


    });
});

function nextQuestion(){
    const  user = localStorage.getItem('username');
    const correctAnswer = localStorage.getItem('correctAnswer');
    
    if (qlevel == 0 && correctAnswer >= 5) {
        face.innerHTML = `<i class="fas fa-trophy"></i>`;
        info.innerHTML = `Hi ${user}, congratulations you are good to go to the next level`;
        points.innerHTML = `You got ${correctAnswer} out of ${(qlevel+1)*10}`;
        if (qlevel == 0 ) {
            nextlevel.style.display = 'block';
            exBtn.style.display = 'block';
            playAgain.style.display = 'none';
        } 
        
    } else if (qlevel == 1 && correctAnswer >= 10){
        face.innerHTML = `<i class="fas fa-trophy"></i>`;
        info.innerHTML = `Hi ${user}, congratulations you are good.`;
        points.innerHTML = `You got ${correctAnswer} out of ${(qlevel+1)*10}`;
        exBtn.style.display = 'block';
        playAgain.style.display = 'none';
        nextlevel.style.display = 'none';
    } 
    else {
        face.innerHTML = `<i class="fas fa-meh-rolling-eyes"></i>`;
        info.innerHTML = `Hi ${user}, sorry you need to brush up your skills and try again.`;
        points.innerHTML = `You got ${correctAnswer} out of ${(qlevel+1)*10}`;
        exBtn.style.display = 'block';
        playAgain.style.display = 'block';
        nextlevel.style.display = 'none';        
    }
    
    if (index < dzQuiz[qlevel].length - 1) {
        index++;
        questC++;
        loadQuestion(index);
        questCounter(questC);
        clearInterval(counter);
        countTime(timer);
        nextQ.style.display = 'none';
    } else {
        quiz.classList.remove('active');
        feedBack.classList.add('reveal');
        
    }
}

function startAgain(){
    feedBack.classList.remove('reveal');
    rules.classList.remove('inactive');
    correct = 0;
    qlevel = level[0];
    questC = 1;
    index = 0;
    loadQuestion(index);
    questCounter(questC);
}

continueBtn.addEventListener('click', userRegistration, false);

rForm.addEventListener('submit', function(e){
    e.preventDefault();
    if (validateName()) {
        localStorage.setItem('username', username.value);
        const  user = localStorage.getItem('username');
        document.getElementById('user').textContent = user;
        welcome.classList.add('active');
        userReg.classList.remove('show');
    }
    
    
});

thankYou.addEventListener('click', function(e){
    if(e == 'click'){
        goQuiz();
    }
});

nextQ.addEventListener('click', function(e){
    if (e == 'click') {
        nextQuestion();        
    }
});

playAgain.addEventListener('click', function(e){
    if (e  == 'click') {
        startAgain();
    }
});

nextlevel.addEventListener('click', function(e){
    if (e == 'click') {
        quizLevel2();
    }
});
