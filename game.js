var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var count = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    console.log(started);
  }
});


  $(".btn").click(function() {
    if(started){
      var userChosenColour = this.id;
      userClickedPattern.push(userChosenColour);
      animatePress(userChosenColour);
      setTimeout(function() {
        $("#" + userChosenColour).removeClass("pressed")
      }, 100);
      $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(userChosenColour);
      checkAnswer(count++);
    }
});


function playSound(name) {
  var sound = "sounds/" + name + ".mp3";
  var audio = new Audio(sound);
  audio.play();
}

function nextSequence() {
  var n = Math.random();
  n *= 4;
  var randomNumber = Math.floor(n);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + ++level);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
}

function checkAnswer(i) {
  if (gamePattern[i] === userClickedPattern[i]) {
    console.log("success");
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    return;
  }
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
    userClickedPattern = [];
    count = 0;
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  count = 0;
  started = false;
}
