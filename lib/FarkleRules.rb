class FarkleRules
  attr_reader :single, :triples

  @single = {
    1 => 100,
    5 => 50
  }

  @triples = {
    1 => 1000,
    2 => 200,
    3 => 300,
    4 => 400,
    5 => 500,
    6 => 600
  }

  def self.scoring_rolls(rolls)
    possible = {} 
      rolls.map do |key, value|
        #converting from json changes keys and values to strings, change it back
        value = value.to_i
        key = key.to_i
        unless value == 0 
         if key == 1  || key == 5 
           possible[key] = value
         elsif value >= 3 
           possible[key] = value
          end
        end  
      end
      return possible
  end
  
  #take scoring rolls and output score value
 def self.points (key,value)
   if key == 5 && value < 3 || key == 1 && value < 3
     return @single[key] * value
   else
     value = value / 3
     return @triples[key]
   end
 end

 #accurately report dice that scored points. example: rolling 4 5s should only report 3 scoring dice
 def self.make_three_or_six(number)
  if number == 6
    return 6
  else
    return 3
  end
 end


end

