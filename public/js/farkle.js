$(document).ready(function(){
  var result = []
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
      data: {dice_count: 6},
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
});