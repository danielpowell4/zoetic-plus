class Exercise < ActiveRecord::Base
	enum category: {plyo: 0, legs: 1, push: 2, pull: 3, core: 4, warmUp: 5, coolDown: 6}
	enum impact: {low: 0, medium: 1, high: 2}
end
