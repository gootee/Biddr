# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Auction.destroy_all
Bid.destroy_all
User.destroy_all

# Question.destroy_all
# Answer.destroy_all
# User.destroy_all
# Like.destroy_all
# Tag.destroy_all

NUM_AUCTIONS = 200
NUM_USERS = 10
NUM_BIDS = 20
PASSWORD = "supersecret"

super_user = User.create(
  first_name: "Jon",
  last_name: "Snow",
  email: "js@winterfell.gov",
  password: PASSWORD,
  is_admin: true
)

NUM_USERS.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end

users = User.all

# NUM_TAGS.times do
#   Tag.create(
#     name: Faker::ProgrammingLanguage.name
#   )
# end

# tags = Tag.all

NUM_AUCTIONS.times do
  ends_at = Faker::Date.forward(days: 365 * 5)
  created_at = Faker::Date.backward(days: 365 * 5)
  a = Auction.create(
    title: Faker::Hacker.say_something_smart,
    description: Faker::ChuckNorris.fact,
    ends_at: ends_at,
    reserve_price: Faker::Commerce.price,
#     view_count: rand(100_000),
    created_at: created_at,
    updated_at: created_at,
    user: users.sample
  )
  if a.valid?
    a.bids = rand(0..10).times.map do
      Bid.new(bid_amount: Faker::Commerce.price, user: users.sample)
    end
#     q.likers = users.shuffle.slice(0, rand(users.count))
#     q.tags = tags.shuffle.slice(0, rand(tags.count / 2))
  end
end

auctions = Auction.all
bids = Bid.all

puts Cowsay.say("Generated #{auctions.count} auctions!", :frogs)
puts Cowsay.say("Generated #{bids.count} bids", :stegosaurus)
puts Cowsay.say("Generated #{users.count} users", :tux)
# puts Cowsay.say("Generated #{likes.count} likes", :cheese)
# puts Cowsay.say("Generated #{tags.count} tags", :kitty)
puts "Login with #{super_user.email} and password: #{PASSWORD}"