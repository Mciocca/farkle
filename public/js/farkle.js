$(document).ready(function(){

 // Game variables
  var diceCount = 6;
  var playerCount = 2;
  var currentPlayer = 1;
  var turnScore = 0;
  //alert player turn on window load
  alertPlayerTurn();
  // hide lightbox on click
  $('.lightbox').click(function(){
    //if lightbox is called after a win, set background to original color
    $(this).css('display', 'none').css('background', 'rgba(220, 221, 216, .45)')
  })

  //Ajax stuff
  //get possible scores to render
  var getPossible = function(roll){
    $.ajax({
      method: 'POST',
      data: {player_roll: roll},
      url: "/farkle/possible",
      success: function(data){
        $(".possible").html('');
        $(".possible").html(data);
        // initialize events for newly loaded elements
        events();
      }
    });
  }
 //show rolled dice
  var showRolls = function(rolls){
    for(key in rolls){
      for(var i = 0; i< rolls[key]; i++){
        $(".result").append('<p class="dice">'+ key +"</p>");
      }
    }
  }
  //roll the dice
  $('.roll-dice').click(function(){
    $this = $(this); 
    $.ajax({
      dataType: "json",
      data: {dice_count: diceCount},
      url: "/farkle/roll",
      success: function( data ){
        console.log(data);
        $('.result').text('');
        $('.dice').remove();
        // using set timeout makes it clear that new dice have been rolled
        setTimeout(function(){showRolls(data);},300);
        setTimeout(function(){getPossible(data);},300);
        $this.hide();
        $("#end-turn").hide();
      }
    });
  });

 //Not ajax stuff

var updatePlayerScore = function(element){
   var score = element.data('score');
   var pscore = parseInt($("#p"+currentPlayer+"score").text());
   $("#p"+currentPlayer+"score").text(pscore + score);
   turnScore = turnScore + score;
   $('.turn-score').text(turnScore);
}

var resetDiceCount = function(){
   diceCount = 6;
  $('.dice-count').text(diceCount); 
}

var subtractDice = function(element){
  var count = element.data('dice');
  diceCount = diceCount - count;
  $('.dice-count').text(diceCount);
  $('.roll-dice').show(); 
}

 var removePrevious = function(){
  $('.choose-points').remove();
  $('.dice').remove();
 }

 var updateBestTurn = function(){
  if(turnScore >= parseInt( $('#best-'+currentPlayer).text() ) ){
    $('#best-'+currentPlayer).text(turnScore);
  } 
 }

 var resetBestTurn = function(){
  $(".best").text("0");
 }

var changePlayerTurn = function(){
  turnScore = 0;
  $('.turn-score').text(0);
  if(currentPlayer != playerCount){
    currentPlayer ++;
    $(".player-turn").text(currentPlayer);
    removePrevious();
    alertPlayerTurn();
  }else{
    currentPlayer = 1;
    $(".player-turn").text(currentPlayer);
    removePrevious();
    alertPlayerTurn();
  }
}

var increaseFarkleCount = function(){
 var fCount = parseInt($('#f-count-'+currentPlayer).text());
 $('#f-count-'+currentPlayer).text(fCount + 1);
}

var alertHotDice = function(){
  $(".alerts").html("<h3>Hot Dice!</h3> <p>Roll 6 more!</p>");
  $(".lightbox").css('display', 'block');
}

//allow function to be called on page load
function alertPlayerTurn(){
   $(".alerts").html("<h3>Player "+currentPlayer+"'s turn</h3>");
   $(".lightbox").css('display', 'block'); 
}

var hotDice = function(){
  if(diceCount === 0){
    resetDiceCount();
    alertHotDice();
    var hotCount = parseInt($("#hot-"+currentPlayer).text());
    $("#hot-"+currentPlayer).text(hotCount + 1);
  }
}

var checkForWinner = function() {
  if(parseInt($("#p"+currentPlayer+"score").text()) >= 10000){
    $(".lightbox").css('display', 'block').css('background', '#D73832');
    $(".alerts").html("<h3>Player "+currentPlayer+" Wins!</h3>");
    $(".score").text(0);
    $(".farkle-count").text(0);
    currentPlayer = 1;
    $('.player-turn').text(currentPlayer);
    resetDiceCount();
    removePrevious();
    turnScore = 0;
    resetBestTurn();
    $('#end-turn').hide();
  }
}

//events need to be initialized for newly loaded DOM elements
 var events = function(){
  //accept scoring dice
  $(".choice").click(function(){
    updatePlayerScore($(this));
    subtractDice($(this));
    $(this).remove();
    $("#end-turn").css("display", "inline-block");
    hotDice();
    checkForWinner();
  });

 $("#reset").click(function(){
   increaseFarkleCount();
   var pscore = parseInt($("#p"+currentPlayer+"score").text());
   $("#p"+currentPlayer+"score").text( pscore - turnScore);
   resetDiceCount(); 
   changePlayerTurn();
   $('.roll-dice').show();
   $(this).parent($('.farkled')).remove();
 });
 //end events
}
 
 $("#end-turn").click(function(){
   updateBestTurn();
   changePlayerTurn();
   $(this).hide();
   resetDiceCount(); 
 });

//end
});
