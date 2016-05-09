class AddVideoToExercises < ActiveRecord::Migration
  def change
    add_column :exercises, :video, :string, default: "https://www.youtube.com/embed/LSvkG2xa3xs&autoplay=1"
  end
end
