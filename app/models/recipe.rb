class Recipe < ActiveRecord::Base

  has_many :ingredients
  has_many :directions
  has_many :reasons

  acts_as_taggable

  accepts_nested_attributes_for :ingredients,
  															reject_if: proc { |attributes| attributes['name'].blank? },
  															allow_destroy: true

 	accepts_nested_attributes_for :directions,
  															reject_if: proc { |attributes| attributes['step'].blank? },
  															allow_destroy: true

  accepts_nested_attributes_for :reasons,
  															reject_if: proc { |attributes| attributes['title'].blank? },
  															allow_destroy: true

  has_attached_file :image, styles: { medium: "400x400#"}, default_url: "http://lorempixel.com/400/400/"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :title, :description, :image, presence: true

end
