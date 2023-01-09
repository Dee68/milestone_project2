/*jshint esversion: 6 */

const rules = document.getElementById('rules');
const continueBtn = document.getElementById('continue');
const welcome = document.getElementById('welcome');
//thank you button
const thankYou = document.getElementById('thank-you');
//message div
const msg = document.getElementById('message');
// quiz div
const quiz = document.getElementById('quiz');
// user registration div
const userReg = document.getElementById('register');
const rForm = document.getElementById('register-form');
const username = document.getElementById('username');
// timer
const timeSec = document.getElementById('timer-sec');
// question section
const questNum = document.getElementById('question-num');
const questText = document.getElementById('question-text');
// next button
const totalQ = document.getElementById('total');

const nextQ = document.getElementById('nextQ');
//answer option buttons
const options = Array.from(document.getElementsByClassName('option'));
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');

// feed back
const feedBack = document.getElementById('feed-back');
const face = document.getElementById('face');
const info = document.getElementById('info');
const points = document.getElementById('points');
const nextlevel = document.getElementById('move-up');
const playAgain = document.getElementById('start-again');
const exBtn = document.getElementById('exit');
// define variables for timer & correct answers & quiz level
let qLevelTime = [10,5];
let level = [0,1];// 1st & 2nd level of quiz
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


//next level btn clicked
function quizLevel2(){
    feedBack.classList.remove('reveal');//hide
    quiz.classList.add('active');//show
    qlevel = level[1];//level 2
    timer = qLevelTime[1];
    questC = 1;
    index = 0;
    countTime(timer);
    //show question with answers
    loadQuestion(index);
    questCounter(questC);  
}

nextlevel.addEventListener('click', function(e){
    if (e == 'click') {
        quizLevel2();
    }
});

   
// popup registration div,clicking continueBtn
function userRegistration(){
    userReg.classList.add('show');//shows div
    rules.classList.add('inactive');//hides
}
continueBtn.addEventListener('click', userRegistration, false);


// function to validate user input
function validateName(){
    let regEx = /^[A-Za-z]+$/;
    if (username.value == '' || !(username.value.match(regEx))) {
        //alert user
        msg.classList.add('alert');
        username.focus();
        return false;
        
    } else {
        return true;
    }
}

// submit form to collect username & save to local storage
rForm.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log(username.value);
    if (validateName()) {
        localStorage.setItem('username', username.value);
        const  user = localStorage.getItem('username');
        document.getElementById('user').textContent = user;
        welcome.classList.add('active');//show
        userReg.classList.remove('show');//hide
    }
    
    
});


thankYou.addEventListener('click', function(e){
    if(e == 'click'){
        goQuiz();
    }
});

// Start Quiz after registration and welcome message.
function goQuiz(){
    welcome.classList.remove('active');//hide
    quiz.classList.add('active');//show
    // count down begins once question is loaded.
    countTime(timer);
    //show question with answers
    loadQuestion(index);
  
    questCounter(questC);
 }


nextQ.addEventListener('click', function(e){
    if (e == 'click') {
        nextQuestion();        
    }
});


//footer question of questions
function questCounter(questC){
    let qTag = `<span><p>${questC++}</p> <span><p>of </p></span><p>${DzQuiz[qlevel].length}</p><span><p>Questions</p></span>`;
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
        // disable all  options when time runs out
            for (let i = 0; i < options.length; i++) {
                options[i].classList.add('disabled');  
            }
        nextQ.style.display = 'block';
        }
    }
}


// load Questions
function loadQuestion(index){ 
    questNum.innerHTML = `${DzQuiz[qlevel][index].num +'.'}`;
    questText.innerHTML = `${DzQuiz[qlevel][index].question}`;
    answer1.innerHTML = `${DzQuiz[qlevel][index].choices[0]}`;
    answer2.innerHTML = `${DzQuiz[qlevel][index].choices[1]}`;
    answer3.innerHTML = `${DzQuiz[qlevel][index].choices[2]}`;
    answer4.innerHTML = `${DzQuiz[qlevel][index].choices[3]}`;

   
// before user clicks an option

options.forEach(function(removeActive){
    removeActive.classList.remove('correct');
    removeActive.classList.remove('incorrect');
    removeActive.classList.remove('disabled');
    removeActive.classList.add('option');
    removeActive.lastElementChild.innerHTML = '';
});


}

//user clicked an answer

options.forEach(function(option){
    option.addEventListener('click', function(){
       
    clearInterval(counter);
    let userAnswer = option.textContent;
    let corTag = `<i class="fas fa-check"></i>`;
    let incorTag = `<i class="fas fa-times"></i>`;
    let correctAns = DzQuiz[qlevel][index].answer;
   
   
    if (userAnswer.trim() == correctAns.trim()) {
        //console.log('correct');
        correct++;
        option.lastElementChild.innerHTML = corTag;
        option.classList.remove('option');
        option.classList.add('correct');
    } else {
        //console.log('incorrect')
        option.lastElementChild.innerHTML = incorTag;
        option.classList.add('incorrect');
        //if incorrect answer automatically show correct answer
        for (let i = 0; i < options.length; i++) {
            if (options[i].textContent.trim() == correctAns.trim()) {
                options[i].setAttribute('class','option correct');
                options[i].lastElementChild.innerHTML = corTag;
            }
            
        }
    }
    //store correct answer
     localStorage.setItem('correctAnswer', correct);
    
     //stop timer
     clearInterval(interval);
    // disable all  options after user's choice
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');  
    }
   
    nextQ.style.display = 'block';


    });
});

// next button clicked
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
        feedBack.classList.add('reveal');
        
    }
}

//restart button clicked
function startAgain(){
    feedBack.classList.remove('reveal');
    rules.classList.remove('inactive');
    // reset score
    correct = 0;
    qlevel = level[0];
    questC = 1;
    index = 0;
    //show question with answers
    loadQuestion(index);
    questCounter(questC);
    
}

playAgain.addEventListener('click', function(e){
    if (e  == 'click') {
        startAgain();
    }
});
