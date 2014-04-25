class Dice

 def self.roll(dice_count)
    rolls = {
      1 => 0,
      2 => 0,
      3 => 0,
      4 => 0,
      5 => 0,
      6 => 0,  
    } 
    dice_count.times do 
      rand = rand((1..6))
      rolls[rand] += 1 
    end
  return rolls
 end


end