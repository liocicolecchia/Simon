var started = false;
var level = 0;

/* Alle the buttons */
var buttonColours = ["red", "blue", "green", "yellow"];

/* Array for Game Pattern */
var gamePattern = [];

/* Array for User Pattern */
var userClickedPattern = [];

/* Constant Function for Sound */
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

/* Constant Function Animation Click */
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

/* Constant Function Restart Game */
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// ---------------------------------------------------

/* next random Button flash */
function nextSequence() {
  /* Constants */
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  /* Push to Game Pattern */
  gamePattern.push(randomChosenColour);

  /* Animation and Sound */
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  /* Increase Level Count */
  level += 1;
  $("h1").text("Level " + level);
}

// ---------------------------------------------------

/* Player button press check */
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  /* Push to User Pattern */
  userClickedPattern.push(userChosenColour);

  /* Animation & Sound */
  playSound(userChosenColour);
  animatePress(userChosenColour);

  /* Call Check Function */
  checkAnswer(userClickedPattern.length - 1);
});

// ---------------------------------------------------

/* START GAME - keypress detection */
$(document).keypress(function () {
  if (started === false) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);
  }
});

// ---------------------------------------------------

/* Check User Answers */
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}
