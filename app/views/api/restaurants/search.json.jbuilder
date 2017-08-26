json.restauants @restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.extract! restaurant, :name, :cuisine, :rating
  end
end
