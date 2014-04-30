Farkle
======

This is the the dice game [Farkle](http://en.wikipedia.org/wiki/Farkle) built on sinatra with a healthy dose of JavaScript.

Run the game
------------
If you would like to run this game locally:

First, make sure you have Ruby installed. I recommend grabbing Ruby and everything needed to get it up and running in a development environment from [here](http://railsinstaller.org/en). This game should work with Ruby 1.9.3+.

Next clone this repo, `$ cd` to it and run `$ bundle install`. From the main folder of the 
game, run `ruby farkle.rb` and navigate your browser to localhost:4567. Now grab a friend and play farkle!

If your feeling lazy, just play it over on [Heroku](http://radiant-taiga-1258.herokuapp.com/).

Playing the game
----------------

Roll the dice, and you will be presented with a list of scoring dice that you can choose to keep. You must keep at least 1 possible scoring combination each roll. You can then choose to roll the remaining dice or end your turn. If you do not roll any scoring dice, you Farkle, and lose all of the points you have accumulated that turn and the other player gets to play. If all 6 dice score points, you have "hot dice" and get to roll all 6 again. First person to 10,000 points wins!