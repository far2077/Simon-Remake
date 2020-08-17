// Declaring Variables
var colours = ["red", "blue", "green", "yellow"]
var redSound = new Audio("sounds/red.mp3");
var blueSound = new Audio("sounds/blue.mp3");
var greenSound = new Audio("sounds/green.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");
var gamePattern = [];
var userPattern = [];
var gameStarted = false;

$(document).keydown(function () {
    if (!gameStarted) {
        newLevel();
        gameStarted = true;
    }
});

function newLevel() {
    // UPDATE AND PLAY THE NEXT SEQUENCE IN gameSequence FOR THE USER
    nextSequence(); 

    // WAITING FOR ALL PREVIOUS ANIMATIONS TO COMPLETE BEFORE READING ANY NEW CLICK EVENTS
    setTimeout(function () {
        userPattern = [];
        $(".btn").click(function () {
            var colour = this.id;

            // PLAYING CLICK ANIMATION ON THE CLICKED BUTTON
            $("#" + colour).addClass("pressed");
            setTimeout(function () {
                $("#" + colour).removeClass("pressed");
            }, 50);
            playSound(colour); // PLAYING BUTTON CLICK SOUND

            // UPDATE userSequence. COMPARING WITH gameSequence. END GAME IF INCORRECT, NEXT ROUND IF CORRECT
            return checkUserSequence(this.id); 
        });
    }, 1000);
}

function playSound(name) { // PLAY THE AUDIO OF ANY mp3 FILE IN THE RELATIVE SOUND FOLDER
    switch (name) {
        case "red":
            redSound.currentTime = 0;
            redSound.play();
            break;
        case "blue":
            blueSound.currentTime = 0;
            blueSound.play();
            break;
        case "green":
            greenSound.currentTime = 0;
            greenSound.play();
            break;
        case "yellow":
            yellowSound.currentTime = 0;
            yellowSound.play();
            break;
        case "wrong":
            wrongSound.currentTime = 0;
            wrongSound.play();
            break;
        default:
            break;
    }  
}

function checkUserSequence (userColour) {
    userPattern.push(userColour);
    comparisonIndex = userPattern.length - 1;

    // CHECK IF THE UPDATED userPattern"s NEWEST INDEX MATCHED gamePattern"s AT THE SAME INDEX
    if (!(userPattern[comparisonIndex] === gamePattern[comparisonIndex])) { // IF IT DOESN"T MATCH, GAME OVER
        $(".btn").off("click");
        return gameOver();
    } // NOTHIG WILL HAPPEN HERE IF THE SEQUENCE IS CORRECT SO FAR, THE GAME WILL CONTINUE
    
    //IF USER HAS COMPLETED INPUTTING THE SECRET, GO TO THE NEXT              
    if (userPattern.length == gamePattern.length) {
        $(".btn").off("click");
        return newLevel();
    }
}

function nextSequence() {

    // PUSHING A NEW RANDOM COLOUR TO game
    let randomNumber = Math.floor(Math.random() * 4);
    let colour = colours[randomNumber];
    gamePattern.push(colour);

    // UPDATE LEVEL TITLE
    $("#level-title").text("Level " + gamePattern.length);

    // REVEAL NEW SEQUENCE COLOUR TO USER
    setTimeout(function () {
        $("#" + colour).fadeOut(125).fadeIn(125);
        playSound(colour); // PLAYING BUTTON CLICK SOUND
    }, 1000);
}

function gameOver() { // SET gameStarted TO FALSE AND EMPTY gamePattern
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    gamePattern = [];
    gameStarted = false;
}
    