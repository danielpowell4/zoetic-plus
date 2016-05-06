class AddSnapshotToExercises < ActiveRecord::Migration
  def change
    add_attachment :exercises, :snapshot
  end
end
