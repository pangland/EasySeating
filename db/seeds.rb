# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create!(username: 'Guest', password: 'unguessable_password');


Restaurant.destroy_all

cuisine = ['American', 'Chinese', 'French', 'Italian', 'Japanese', 'Mexican', 'Pizza']

(0...100).each do |i|
  Restaurant.create(name: Faker::Name.name, description: Faker::MostInterestingManInTheWorld.quote, cuisine: cuisine[i % cuisine.length],
  price: (i % 4).to_s, rating: 0, image_url: "MRW.jpg", hours: (i % 2).to_s);
end
