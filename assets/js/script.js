const DzQuiz  = [
    [
    {   num: 1,
        question: "What does HTML stand for ?",
        choices:[ 
        "Hyperlinks and Text Markup Language",
        "Hyper Text Markup Language",
        "hyper Text Making Languaage",
        "Hyper Text Make Language",
        ],
        answer: "Hyperlinks and Text Markup Language"
    },
    {   num: 2,
        question: "What does CSS stand for?",
        choices:[
        "Colourful Style Sheet",
        "Creative Style Sheet",
        "Cascading Style Sheet",
        "Computer Style Sheeet",
        ],
        answer: "Cascading Style Sheet"

    },
    {   num: 3,
        question: "What does XML stand for ?",
        choices:[
        "Extensible Markup Language",
        "Executable Multiple Language",
        "Extra Multi Program Language",
        "Examine Multi Language",
        ],
        answer: "Extensible Markup Language"
    },
    {   num: 4,
        question: "Which is the correct CSS synthax ?",
        choices:[
        "body{color:black;}",
        "{body{color:black;}",
        "body=color:black;",
        "body:{color=black}",
        ],
        answer: "body{color:black;}"
    },
    {   num: 5,
        question: "How do you add a background color for all h1 elements ?",
        choices:[
        "h1.all {background-color:#FFFFFF;}",
        "all.h1 {background-color:#FFFFFF;}",
        "h1 {background-color:#FFFFFF;}",
        "all.h1 {color-background:#FFFFFF;}",
        ],
        answer: "h1 {background-color:#FFFFFF;}"
    },
    {   num: 6,
        question: "Which CSS property is used to change the text color of an element ?",
        choices:[
        "text-color",
        "color",
        "fgcolor",
        "color-text",
        ],
        answer: "color"
    },
    {   num: 7,
        question: "Which property is used to change the background color in CSS ?",
        choices:[
        "background-color",
        "backgroundColor",
        "bgColor",
        "color-background",
        ],
        answer: "background-color" 
    },
    {   num: 8,
        question: "Which CSS property controls the text size ?",
        choices:[
        "font-size",
        "text-size",
        "size",
        "font-style",
        ],
        answer: "font-size"
    },
    {   num: 9,
        question: "Which attributes are neccessary for the &lt;img&gt; tag in HTML ?",
        choices:[
        "alt and data",
        "data and source",
        "src and alt",
        "alt and source",
        ],
        answer: "src and alt"
    },
    {   num: 10,
        question: "How do you display hyperlinks without an underline ?",
        choices:[
        "a {underline:none;}",
        "a {text-decoration:none;} ",
        "a {decoration:no-underline;}",
        "a {text-decoration:no-underline;}",
        ],
        answer: "a {text-decoration:none;} "
    }
    ],
    
    [
        {   num: 1,
            question: "The HTML &lt;canvas&gt; element is used to: ?",
            choices:[ 
            "draw graphics",
            "manipulate data in MySQL",
            "display database records",
            "create draggable elements",
            ],
            answer: "draw graphics"
        },
        {   num: 2,
            question: "In HTML, which attribute is used to specify that an input field must be filled out",
            choices:[
            "placeholder",
            "validate",
            "required",
            "formvalidate",
            ],
            answer: "required"
    
        },
        {   num: 3,
            question: "Which input type defines a slider control ?",
            choices:[
            "slider",
            "controls",
            "gauge",
            "range",
            ],
            answer: "range"
        },
        {   num: 4,
            question: "Which HTML attribute is used to define inline styles ?",
            choices:[
            "style",
            "class",
            "styles",
            "font",
            ],
            answer: "style"
        },
        {   num: 5,
            question: "Who is making the web standards ?",
            choices:[
            "Microsoft",
            "Google",
            "The World Wide Web Consortium",
            "Mozilla",
            ],
            answer: "The World Wide Web Consortium"
        },
        {   num: 6,
            question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed ?",
            choices:[
            "longdesc",
            "alt",
            "src",
            "title",
            ],
            answer: "alt"
        },
        {   num: 7,
            question: "Which property is used to change the background color in CSS ?",
            choices:[
            "background-color",
            "backgroundColor",
            "bgColor",
            "color-background",
            ],
            answer: "background-color" 
        },
        {   num: 8,
            question: "In HTML, onblur and onfocus are: ?",
            choices:[
            "Style attributes",
            "HTML elements",
            "Can only be used in Javascript",
            "Event attributes",
            ],
            answer: "Event attributes"
        },
        {   num: 9,
            question: "Which attributes are neccessary for the &lt;img&gt; tag in HTML ?",
            choices:[
            "alt and data",
            "data and source",
            "src and alt",
            "alt and source",
            ],
            answer: "src and alt"
        },
        {   num: 10,
            question: "Graphics defined by SVG is in which format ?",
            choices:[
            "HTML",
            "XML",
            "CSS",
            "Javascript",
            ],
            answer: "XML"
        }

    ]

];
let start = document.getElementById('start');
// rules div
let rules = document.getElementById('rules');
// exit button
let quitBtn = document.getElementById('quit');

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

// user registration div
let userReg = document.getElementById('register');

let rForm = document.getElementById('register-form');

let username = document.getElementById('username');
//continue button
let continueBtn = document.getElementById('continue');

// popup registration div,clicking continueBtn
function userRegistration(){
    userReg.classList.add('show');//shows div
    rules.classList.remove('active');//hides
    start.classList.add('inactive');//hides
}
continueBtn.addEventListener('click', userRegistration, false);

//thank you div/button
let welcome = document.getElementById('welcome');
// function to validate user input
function validateName(){
    let regEx = /^[A-Za-z]+$/;
    if (username.value == '' || !(username.value.match(regEx))) {
        //alert user
        username.focus();
        return false;
        
    } else {
        return true;
    }
}

let msg = document.getElementById('message');
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
    //alert user
    msg.classList.add('alert');
    
});

//thank you button
let thankYou = document.getElementById('thank-you');
thankYou.addEventListener('click', function(e){
    if(e == 'click'){
        goQuiz();
    }
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

// timer
let timeSec = document.getElementById('timer-sec');
// question section
let questions = document.getElementById('quiz-questions');
// next button
let totalQ = document.getElementById('total');

let nextQ = document.getElementById('nextQ');
nextQ.addEventListener('click', function(e){
    if (e == 'click') {
        nextQuestion();        
    }
});
// leave button
let exitBtn = document.getElementById('leave');
// click exit button
exitBtn.addEventListener('click', function(){
    quiz.classList.remove('active');
    localStorage.clear();
    start.classList.remove('inactive');
    start.classList.add('active');
})

//answer option buttons
let options = document.getElementsByClassName('option');

// feed back
let feedBack = document.getElementById('feed-back');
 
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
localStorage.setItem('correctAnswer', 'correct');

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
    let quesTag = `<div class="questions">
    <span id="question-num">${DzQuiz[qlevel][index].num +'.'}</span>
    <span id="question-text">${DzQuiz[qlevel][index].question}</span></div>
    <div class="option-list">
                    <div class="option">
                        <span id="answer1" class="answers">${DzQuiz[qlevel][index].choices[0]}</span>
                        <div class="icon"></div>
                    </div>
                    <div class="option">
                        <span id="answer2" class="answers">${DzQuiz[qlevel][index].choices[1]}</span>
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
        //console.log('correct');
        correct++;
        answ.lastElementChild.innerHTML = corTag;
        answ.classList.remove('option');
        answ.classList.add('correct');
    } else {
        //console.log('incorrect')
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
    //store correct answer
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
    
    const  user = localStorage.getItem('username');
    
    const correctAnswer = localStorage.getItem('correctAnswer');
    
    
    let feedtag;
    if (qlevel == 0 && correctAnswer >= 5) {
        feedtag = `
        <i class="fas fa-trophy"></i>
        <h4>Hi ${user}, congratulations you are good to go to the next level</h4>
        <h4 id="points">You got ${correctAnswer} out of ${(qlevel+1)*10}</h4>
        <button id="exit" onclick="returnHome()">Quit Quiz</button>`;
        if (qlevel == 0) {
            feedtag += `<button id="move-up" onclick="quizLevel2()">Next Level</button>`;
        }
        
        
    } else if (qlevel == 1 && correctAnswer >= 10){
        feedtag = `
        <i class="fas fa-trophy"></i>
        <h4>Hi ${user}, congratulations you are good.</h4>
        <h4 id="points">You got ${correctAnswer} out of ${(qlevel+1)*10}</h4>
        <button id="exit" onclick="returnHome()">Quit Quiz</button>`;
        
    } 
    else {
        feedtag = `<i class="fas fa-meh-rolling-eyes"></i>
            <h4>Hi ${user}, sorry you need to brush up your skills and try again</h4>
            <h4 id="points">You got ${correctAnswer} out of ${(qlevel+1)*10}</h4>
            <button id="exit" onclick="returnHome()">Quit Quiz</button>
            <button id="start-again" onclick="startAgain()">Start Again</button>`; 
               
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
        
    }
}


//restart button clicked
function startAgain(){
    feedBack.classList.remove('reveal');
    rules.classList.add('active');//show
    // reset score
    correct = 0;
    qlevel = level[0];
    questC = 1;
    index = 0;
    //show question with answers
    loadQuestion(index);
    questCounter(questC);
    
}



// exit quiz and return back to start page
function returnHome(){
    feedBack.classList.remove('reveal');
    start.classList.remove('inactive');
    start.classList.add('active');
}




    

