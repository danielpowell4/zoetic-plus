class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.integer :category
      t.text :exercise
      t.integer :intensity
      t.boolean :onesided
      t.boolean :compound
      t.boolean :isolation
      t.text :primary
      t.text :secondary
      t.integer :impact
      t.text :description
      t.text :tip

      t.timestamps null: false
    end
  end
end
