json.array!(@exercises) do |exercise|
  json.extract! exercise, :id, :category, :exercise, :onesided, :compound, :isolation, :primary, :secondary, :impact, :description, :tip
  json.url exercise_url(exercise, format: :json)
end
