$(document).ready(function(){
  var diceCount = 6;
  var turn = 1;
  var turnScore = 0

  //Ajax stuff
  //get possible scores to render
  var getPossible = function(roll){
    console.log("Data inputed to function " + roll);
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
      $('.result').append("<p> Rolled "+ key + " " +rolls[key] +" times</p>");
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
        $('.result').text('');
        console.log(data);
        showRolls(data);
        setTimeout(function(){
          getPossible(data);
        }, 1000);
        //$this.hide();
      }
    });
  });

 //Not ajax stuff
//events need to be initialized for newly loaded dom elements
 var events = function(){
  
  $(".choose-points li").click(function(){
     var score = $(this).data('score');
     var pscore = parseInt($(".p2score").text());
     $(".p2score").text(pscore + score);
     turnScore = turnScore + score;
     var count = $(this).data('dice');
     diceCount = diceCount - count;
     $('.dice-count').text(diceCount); 
     $(this).remove();
  });
  
 $("#reset").click(function(){
   var pscore = parseInt($(".p2score").text());
   $(".p2score").text( pscore - turnScore);

 });
}


});