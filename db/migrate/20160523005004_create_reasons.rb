class CreateReasons < ActiveRecord::Migration
  def change
    create_table :reasons do |t|
      t.text :title
      t.string :description
      t.belongs_to :recipe, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
