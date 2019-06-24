$(document).ready(function () {

    //Create start screen with Welcome and Start button
    function startScreen() {
        startScreen = "<h1 style = 'text-align: center;'>Welcome to the NBA Quiz!</h1><br><br><button type='button' class='btn btn-primary btn-lg btn-block start-button'>START GAME</button>";
        $(".titleAndStart").html(startScreen);
    }
    startScreen();


    //Create on-click function which will lead from the start screen into the first question:
    $("body").on("click", '.start-button', function (event) {
        console.log("button clicked " + $(this).text());
        loadQuestions();
    });

    //Create on-click event for the reset button when the game gets to the end:
    $("body").on("click", '.reset-button', function (event) {
        console.log("Reset button clicked");
        questionNumber = 0;
        correctTotal = 0;
        incorrectTotal = 0;
        noAnswerTotal = 0;
        timer = 15;
        wins = 0;
        losses = 0;
        noAnswer = 0;
        startScreen();
    })

    //Click function for answer buttons with if statements to determine correct answers
    //and when the game should end after 10 questions:
    $("body").on("click", '.answer-button', function (event) {
        console.log("Answer button clicked");
        var selected = $(this).text(); //This is the answer button the user chose

        //To track the wins and losses:
        if (questionNumber < 10) {
            if (selected === questionArray[questionNumber].answer) {
                wins++;
                youWin();
                clearInterval(clock);
            } else {
                loss++;
                youLose();
                clearInterval(clock);
            }
        }
        if (questionNumber === 9) {
            finalScreen();
        }
        console.log("Wins: " + wins + " Losses: " + loss);
    });

    var timerBox;
    var timer = 30;
    var clock;
    var wins = 0;
    var losses = 0;
    var correctTotal = 0;
    var incorrectTotal = 0;
    var noAnswerTotal = 0;

    //Creating final screen function to display data at end of game
    //with restart button to restart the game:
    function finalScreen() {
        gameQuestions = "<p style = text-align:center;>You finished! Here are your results:</p>" + "<p>Correct Answers: " + correctTotal + "</p>" + "<p>Wrong Answers: " + incorrectTotal + "</p>" + "<p>Unanswered: " + noAnswerTotal + "</p>" + "<br><br>" + "<button type='button' class='btn btn-primary btn-lg btn-block start-button'>RESTART GAME!</button>";
        $(".titleAndStart").html(gameQuestions);
    };

    //Function for timed questions (30 seconds) for questions 1-9:
    function wait() {
        if (questionNumber < 9) {
            questionNumber++;
            loadQuestions();
            timer = 30;
        }
    };

    //Function for when time runs out, correct answer or incorrect answer during questions
    //Reset the clock and show message for 4 seconds:

    function timeIsUp() {
        noAnswerTotal++;
        timeUp = "<p style = text-align: center;>Time is up!</p>" + "<p>The correct answer was: " + questionArray[questionNumber].answer + "</p>";
        $(".titleAndStart").html(timeUp);
        clearInterval(clock);
        setTimeout(wait, 4000);

    }

    function youWin() {
        correctTotal++;
        winner = "<p style = text-align: center;>You're correct!</p>" + "<p>The answer was: " + questionArray[questionNumber].answer + "</p>";
        $(".titleAndStart").html(winner);
        setTimeout(wait, 4000);
    }

    function youLose() {
        loser = "<p style = text-align: center;>You're wrong!" + "<p>The correct answer was: " + questionArray[questionNumber].answer + "</p>";
        $(".titleAndStart").html(loser);
        setTimeout(wait, 4000);
    }

    //Reset to final screen:
    function reset() {
        finalScreen();
    }

    //30 second clock for answering each question:
    function answerClock() {
        clock = setInterval(thirtySeconds, 1000);
    }
    function thirtySeconds() {
        if (timer === 0) {
            clearInterval(clock);
            timeIsUp();
        }
        if (timer > 0) {
            timer--;
        }
        $(".timerBox").html(timer);
    }


    //Create functions for timers, wins, losses, reset
    //Create Object with questions and answer choices

    var questionNumber = 0;
    var questionArray = [
        {
            question: "In what city were the Los Angeles Lakers initially based?",
            options: ['Detroit', 'Seattle', 'Minneapolis', 'San Francisco'],
            answer: "Minneapolis",
        },
        {
            question: "Wilt Chamberlain once scored 100 points in a game. Which player has the second-highest total points in a single game?",
            options: ['Kobe Bryant', 'Kareem Abdul-Jabbar', 'LeBron James', 'Michael Jordan'],
            answer: "Kobe Bryant",
        },
        {
            question: "Who guarded Michael Jordan when he made his buzzer-beater against Cleveland in the 1989 playoffs?",
            options: ['Hakeem Olajuwon', 'Bryon Russell', 'Charles Barkley', 'Craig Ehlo'],
            answer: "Craig Ehlo",
        },
        {
            question: "Which of these players has a father who also played in the NBA?",
            options: ['Steph Curry', 'Kristaps Porzingis', 'Dirk Nowitzki', 'Kevin Durant'],
            answer: "Steph Curry",
        },
        {
            question: "Which NBA team has won the most titles?",
            options: ['San Antonio Spurs', 'Boston Celtics', 'Los Angeles Lakers', 'Golden State Warriors'],
            answer: "Boston Celtics",
        },
        {
            question: "What former NBA player was the inspiration for the NBA logo?",
            options: ['Michael Jordan', 'Wilt Chamberlain', 'Jerry West', 'Elgin Baylor'],
            answer: "Jerry West",
        },
        {
            question: "Who was the first Mexican-born NBA player?",
            options: ['Eduardo Najera', 'Carlos Delfino', 'Carlos Arroyo', 'Horacio Llamas'],
            answer: "Horacio Llamas",
        },
        {
            question: "Which of these players went straight from high school to the NBA?",
            options: ['John Wall', 'Monta Ellis', 'Kevin Durant', 'Klay Thompson'],
            answer: "Monta Ellis",
        },
        {
            question: "What were the New Orleans Pelicans previously called?",
            options: ['Thunder', 'Bullets', 'Hornets', 'Royals'],
            answer: "Hornets",
        },
        {
            question: "In what season did the NBA adopt the 3-point shot?",
            options: ['1969-70', '1991-92', '1979-80', '1984-85'],
            answer: "1979-80",
        }
    ]

    //Loading questions to the screen:
    var gameQuestions = 0;

    function loadQuestions() {
        timer = 30;
        clearInterval(clock);
        gameQuestions = "<p>Time Remaining: " + "<span class='timerBox'>30</span></p>" +
            "<p style = text-align: center;>" + questionArray[questionNumber].question + "</p>" +

            "<br><button type='button' class='btn btn-primary btn-lg btn-block start-button'>" + questionArray[questionNumber].options[0] + "</button>" +
            "<br><button type='button' class='btn btn-primary btn-lg btn-block start-button'>" + questionArray[questionNumber].options[1] + "</button>" +
            "<br><button type='button' class='btn btn-primary btn-lg btn-block start-button'>" + questionArray[questionNumber].options[2] + "</button>" +
            "<br><button type='button' class='btn btn-primary btn-lg btn-block start-button'>" + questionArray[questionNumber].options[3] + "</button>"
        $(".titleAndStart").html(gameQuestions);
        answerClock();
    }

});












