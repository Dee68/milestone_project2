// start button
let start = document.getElementById('start');

// rules div
let rules = document.getElementById('rules');

// quiz div
let quiz = document.getElementById('quiz');

// user registration div
let userReg = document.getElementById('register');

let username = document.getElementById('username').value;

// exit button
let exit = document.getElementById('quit');

//continue button
let continueBtn = document.getElementById('continue');

// registraion button
let register = document.getElementById('register');

function openPopup(){
    start.classList.add('inactive');
    rules.classList.add('active');
}

function closePopup(){
    rules.classList.remove('active');
    start.classList.remove('inactive');
}

function userRegistration(){
    userReg.classList.add('show');
    rules.classList.remove('active');
}

function startQuiz(){
    userReg.classList.remove('show');
    quiz.classList.add('flash');
    console.log(username);
}

