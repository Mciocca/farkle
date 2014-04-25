#redis4you
require 'redis'
redis = Redis.new(:url => 'redis://redistogo:9a33157669eb64a75fe81c630cd28c66@barreleye.redistogo.com:10885/')
require 'bundler/setup'
require 'sinatra'
require 'sinatra/reloader' if development?
require './lib/FarkleRules.rb'
require './lib/Dice.rb'
require './lib/Player.rb'
require 'json'

get '/' do 
  erb :index
end

get '/farkle' do
 erb :farkle
end

#send rolled dice to client
get '/farkle/roll' do
  content_type :json
  #Farkle.scores(Farkle.roll_dice(6)).to_json
  Dice.roll(params[:dice_count].to_i).to_json
end

#send possible scores to client
post '/farkle/possible' do
  h = FarkleRules.scoring_rolls(params[:player_roll])
  erb :possible_scores, :layout => false, :locals => {:h => h}
end

get '/test' do
  content_type :json
   FarkleRules.scoring_rolls(Dice.roll(6)).to_json
end