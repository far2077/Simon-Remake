// Declaring Variables
var colours = ["red", "blue", "green", "yellow"]
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
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
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
    }, 1000);
    playSound(colour); // PLAYING BUTTON CLICK SOUND
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    gamePattern = [];
    userPattern = [];
    gameStarted = false;
}
    