class Player 
  attr_accessor :name, :dice_count, :scoring_dice

  def initialize(name)
    @name = name
    #redis.hmset("user:#{self.name}", 'dice_count 6 scoring_dice 0' )
  end

  def remove_dice(number)
    count = self.dice_count
    count = count - number
    #redis.hmset("user:#{self.name}", "dice_count #{count}" )
  end

end