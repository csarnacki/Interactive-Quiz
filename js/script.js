let quizStatus = true;// Quiz is not running = false , running = true
let questionNumber = 0; // Track the question answered.
let answerNumber = 0; // Track next answers to show
let score = 0; 
let highScore = 50; 
let finalAnswerCheck = 0 
let checkTimes = 1 
let viewHighScoresBtnEl = document.getElementById('view-high-scores'); 
let startQuizBtnEl = document.getElementById('start-quiz'); 
let answer1BtnEl = document.getElementById('answer1'); 
let answer2BtnEl = document.getElementById('answer2'); 
let answer3BtnEl = document.getElementById('answer3'); 
let answer4BtnEl = document.getElementById('answer4'); 
let submitScoreEl = document.getElementById('submitScore'); 
let questionsEl = document.getElementById('questions'); 
let mainDivEl = document.getElementById('mainDiv'); 
let htmlTimeLeft = document.getElementById('timeLeft'); // Display counter @ the html level.
let answerCorrectWrong = document.getElementById('answerCorrectWrong'); // Display counter @ the html level.
let questionDisplayEl = document.createElement("questionDisplay"); 
let finalScoreDisplayEl = document.createElement("finalScoreDisplay"); 
let enterInitialsEl = document.createElement("enterInitials"); 
let enterInitialsTextAreaEl = document.createElement("enterInitialsTextArea"); 
let timeLeft = 60; 

// Do not display anything that is not ready to be displayed
answer1BtnEl.style.display = 'none';
answer2BtnEl.style.display = 'none';
answer3BtnEl.style.display = 'none';
answer4BtnEl.style.display = 'none';
submitScoreEl.style.display = 'none';
answerCorrectWrong.style.display='none';
enterInitialsTextArea.style.display='none';

let questionsObject = { 
    correct: { 
        0 : "Commonly used datatypes do not include?",
        1 : "The if/else condition statement is enclosed with the following:",
        2 : "Arrays can be used to store the following", 
        3 : "A very useful tool to debug code is:", 
        4 : "Strings must be surrounded with:"
    }
};

let answersObject = { 
    answers: { 
        0 : {
            0: "Strings",
            1: "Boolean",
            2: "Alerts",
            3: "Numbers"},
        1 : {
            0: "Parentheses",
            1: "Curly Brackets",
            2: "Quotes",
            3: "Square Brackets"},
        2 : { 
            0: "Javascript",
            1: "Terminal/bash",
            2: "For loops", 
            3: "Console.log"},      
        3 : { 
            0: "Commas",
            1: "Curly brackets",
            2: "Quotes", 
            3: "Parentheses"},      
        4 : { 
            0: "Number of strings",
            1: "Other arrays",
            2: "Booleans",
            3: "All of the above"},  
    }
};

htmlTimeLeft.textContent = timeLeft;

viewHighScoresBtnEl.addEventListener("click", function() { 
    let quizUsers = "";
    let substringTest ="";
    let highScores = "";

    for (let i=0; i < localStorage.length; i++) {
        let checkUserValue = [];       
        quizUsers = localStorage.getItem(localStorage.key(i));
        substringTest = quizUsers.substring(0,4) 
        if (substringTest == "quiz") {
            checkUserValue = quizUsers.split(",");
            let userName = checkUserValue[0]
            highScores += "User " + userName.substring(4) + " high score is: " + checkUserValue[1] + "\n";
       }
    }
    alert(highScores);
});

submitScoreEl.addEventListener("click", function() { // Submit high scores
    let quizLocalStorage = "quiz";
    let quizUserDetails = "";
    let value = [];
    
    quizUserDetails = quizLocalStorage + enterInitialsTextArea.value 
    value = [quizUserDetails,highScore] 
         
    for (let i=0; i < localStorage.length; i++){    
        let checkUser = "";
        let checkUserValue = [];
        quizUserDetails = quizLocalStorage + enterInitialsTextArea.value;
        checkUser = localStorage.getItem(quizUserDetails);

        if (checkUser == null) { // New user
            localStorage.setItem(quizUserDetails, value); 
            alert("Your score of " + highScore + " has been submitted!")
        } else if (checkUser != null){
            checkUserValue = checkUser.split(","); 
        }  
    }   
} );

startQuizBtnEl.addEventListener("click", function() {
    let timeInterval = setInterval(function() {
        if (score === 1){ // For any wrong answer, remove a point
            highScore -= 10;
        }
        score = 0; 
  
        if(timeLeft >= 1 && finalAnswerCheck !== 1) {
            //Assign text content to the question from the object
            questionDisplay.textContent = questionsObject.correct[questionNumber];
            
            questionDisplay.style.display= ""; 
            answer1BtnEl.style.display = ""; 
            answer2BtnEl.style.display = "";
            answer3BtnEl.style.display = "";
            answer4BtnEl.style.display = "";

            //Display asnwers to the question
            answer1BtnEl.textContent = answersObject.answers[answerNumber][0];
            answer2BtnEl.textContent = answersObject.answers[answerNumber][1];
            answer3BtnEl.textContent = answersObject.answers[answerNumber][2];
            answer4BtnEl.textContent = answersObject.answers[answerNumber][3];
           
            gridContainer.appendChild(questionDisplayEl);
            gridContainer.appendChild(answer1BtnEl);
            gridContainer.appendChild(finalScoreDisplayEl);
            timeLeft -= 1;
            htmlTimeLeft.textContent = timeLeft;
        
            answer1BtnEl.addEventListener("click", function() {

                if (questionDisplay.textContent === "The if/else condition statement is enclosed with the following:" && answer1BtnEl.textContent === "Parentheses") {
                    questionNumber = 2; 
                    answerNumber = 4;
                    answerCorrectWrong.style.display="";
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else {
                    //A switch is created to deal with multiple outcomes
                    switch(answer1BtnEl.textContent) {
                        case "Strings":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";                       
                            score = 1; 
                            questionNumber = 1; 
                            answerNumber = 1;
                            break;
                        case "Number of strings":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2;
                            break;
                        case "Javascript":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 4;
                            answerNumber = 3;
                        break;
                        case "Commas":
                            answerCorrectWrong.style.display=""; 
                            answerCorrectWrong.textContent = "Correct!";
                            answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                            questionNumber = 0; // Game is over, no more questions to show.
                            answerNumber = 0; // Game is over, no more answers to show.
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display='none'; // When time is over correct or wrong will go away.
                            startQuizBtnEl.style.display = 'none'; // Remove Start Quiz button.
                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = ""; // Allow display for final score
                            enterInitials.style.display = ""; // Display Message Enter initials
                            enterInitialsTextArea.style.display="";  
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";                   
                            clearInterval(timeInterval);
                            break;
                    }
                }      
            });

            answer2BtnEl.addEventListener("click", function() {
                if (questionDisplay.textContent === "Strings must be surrounded with:" && answer3BtnEl.textContent === "Quotes") {
                    answerCorrectWrong.style.display=""; 
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                    questionNumber = 0; 
                    answerNumber = 0; 
                    answer1BtnEl.style.display = 'none';
                    answer2BtnEl.style.display = 'none';
                    answer3BtnEl.style.display = 'none';
                    answer4BtnEl.style.display = 'none';
                    answerCorrectWrong.style.display='none'; 
                    startQuizBtnEl.style.display = 'none'; 
                    questionDisplay.textContent = "You have finished the quiz!";
                    finalScoreDisplay.style.display = ""; 
                    enterInitials.style.display = ""; 
                    enterInitialsTextArea.style.display="";  
                    finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                    enterInitials.textContent = "Enter initials: "
                    submitScoreEl.style.display = "";
                    submitScoreEl.textContent = "Submit";                   
                    clearInterval(timeInterval);
                } else {
                    switch(answer2BtnEl.textContent) {
                        case "Boolean":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";                          
                            score = 1; 
                            questionNumber = 1; 
                            answerNumber = 1;
                            break;
                        case "Curly Brackets":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";                         
                            score = 1; 
                            questionNumber = 2; 
                            answerNumber = 4;
                            break;
                        case "Other arrays":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2;
                            break;
                        case "Terminal/bash":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 4;
                            answerNumber = 3;
                            break;                   
                    }
                 }               
            });

            answer3BtnEl.addEventListener("click", function() {
                if (questionDisplay.textContent === "Commonly used datatypes do not include?" && answer3BtnEl.textContent === "Alerts") {
                    questionNumber = 1; 
                    answerNumber = 1;
                    answerCorrectWrong.style.display=""; 
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else if (questionDisplay.textContent === "A very useful tool to debug code is:" && answer3BtnEl.textContent === "Console.log") {
                    questionNumber = 4; 
                    answerNumber =3;
                    answerCorrectWrong.style.display=""; 
                    answerCorrectWrong.textContent = "Correct!";
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else if (questionDisplay.textContent === "The condition statement if/else is enclosed with the following:" && answer3BtnEl.textContent === "Quotes") {
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 2; 
                            answerNumber = 4;
                }            
                else {
                    switch(answer3BtnEl.textContent) {
                        case "Booleans":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 3; 
                            answerNumber = 2;
                            break;
                        case "Quotes":
                            score = 1; 
                            questionNumber = 0; 
                            answerNumber = 0; 
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display='none'; 
                            startQuizBtnEl.style.display = 'none'; 
                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = ""; 
                            enterInitials.style.display = ""; 
                            enterInitialsTextArea.style.display="";  
                            finalAnswerCheck = 1; 
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";                   
                            clearInterval(timeInterval);                      
                        break;
                    }
                }
            });

            answer4BtnEl.addEventListener("click", function() {
                if (questionDisplay.textContent === "Arrays can be used to store the following" && answer4BtnEl.textContent === "All of the above") {
                    questionNumber = 3; 
                    answerNumber = 2;
                    answerCorrectWrong.style.display=""; 
                    answerCorrectWrong.textContent = "Correct!"
                    answerCorrectWrongGrid.appendChild(answerCorrectWrong);
                } else {
                      switch(answer4BtnEl.textContent) {
                        case "Numbers":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 1; 
                            answerNumber = 1;
                            break;
                        case "Square Brackets":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 2; 
                            answerNumber = 4;
                            break;
                        case "Console.log":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 4; 
                            answerNumber = 3;
                        break;
                        case "Parentheses":
                            answerCorrectWrong.style.display="";
                            answerCorrectWrong.textContent = "Wrong!";
                            score = 1; 
                            questionNumber = 0; 
                            answerNumber = 0; 
                            answer1BtnEl.style.display = 'none';
                            answer2BtnEl.style.display = 'none';
                            answer3BtnEl.style.display = 'none';
                            answer4BtnEl.style.display = 'none';
                            answerCorrectWrong.style.display='none'; 
                            startQuizBtnEl.style.display = 'none'; 
                            questionDisplay.textContent = "You have finished the quiz!";
                            finalScoreDisplay.style.display = ""; 
                            enterInitials.style.display = ""; 
                            enterInitialsTextArea.style.display="";  
                            finalAnswerCheck = 1; 
                            lastQuestionWrong();
                            finalScoreDisplay.textContent = "Your final score is: " + highScore; 
                            enterInitials.textContent = "Enter initials: "
                            submitScoreEl.style.display = "";
                            submitScoreEl.textContent = "Submit";                   
                            clearInterval(timeInterval);
                        break;                       
                    }               
                }             
            });
        }
        else if(timeLeft === 0){

          console.log("I'm here" + timeInterval);
          questionNumber = 0; // Reset all questions
          answerNumber = 0; // Reset all possible answers.
          answer1BtnEl.style.display = 'none';
          answer2BtnEl.style.display = 'none';
          answer3BtnEl.style.display = 'none';
          answer4BtnEl.style.display = 'none';
          answerCorrectWrong.style.display='none'; // When time is over correct or wrong will go away.
          questionDisplay.textContent = "Game Over!. Try again by clicking on \"Click Start Quiz\"";
          startQuizBtnEl.style.display = "";
          clearInterval(timeInterval);
        }
      }, 1000)
});

function lastQuestionWrong () {
        if (finalAnswerCheck === 1 && checkTimes === 1) {
        highScore -= 10;
        checkTimes = 2;
        return highScore
    }
  }