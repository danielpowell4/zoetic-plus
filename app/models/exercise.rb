class Exercise < ActiveRecord::Base
	enum category: {plyo: 0, legs: 1, push: 2, pull: 3, core: 4, warmUp: 5, coolDown: 6}
	enum impact: {low: 0, medium: 1, high: 2}

	has_attached_file :snapshot, styles: { med: "260X260", }, default_url: "http://placehold.it/260X260"
    validates_attachment_content_type :snapshot, content_type: /\Aimage\/.*\Z/

end
