// start button
let start = document.getElementById('start');

// rules div
let rules = document.getElementById('rules');

// user registration div
let userReg = document.getElementById('register');

// exit button
let exit = document.getElementById('quit');

//continue button
let continueBtn = document.getElementById('continue');

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

