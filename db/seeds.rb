# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# subscriptions, memberships, user, menus, menu-items, add-ons

subscription_1 = Subscription.create( :name => '144 meals for 12 weeks',
                                      :description => 'Looking to start eating healthier? Enjoy 12 meals per week, yum',
                                      :price => 200,
                                      :weeks => 12,
                                      :meals => 144)

subscription_2 = Subscription.create( :name => '216 meals for 12 weeks',
                                      :description => 'For the people who are constantly on the go and want to eat healthier. 18 meals per week.',
                                      :price => 300,
                                      :weeks => 12,
                                      :meals => 216)

subscription_3 = Subscription.create( :name => '72 meals for 12 weeks',
                                      :description => 'For those looking to supplement their own cooking. 6 meals per week.',
                                      :price => 100,
                                      :weeks => 12,
                                      :meals => 72)

menu_fall = Menu.create( :title => 'Fall Harvest Spread')
menu_spring = Menu.create( :title => 'Warming up with Spring Specials')
menu_winter = Menu.create( :title => 'Hearty and Warming for Winter')
menu_summer = Menu.create( :title => 'Succulent Summer dishes')

lasagna = MenuItem.create(  :name => 'Lasagna',
                            :description => 'Tasty italian dish with cheese, pasta, and sauce.',
                            :category => 'Entree')
mejadra = MenuItem.create(  :name => 'Mejadra',
                            :description => 'Delicicious dish that uses lots of spices and combines them with lovely onions.',
                            :category => 'Entree')
lasagna = MenuItem.create(  :name => 'Dumplings',
                            :description => 'Simple, yet complicated dish is delicous.',
                            :category => 'Entree')
mejadra = MenuItem.create(  :name => 'Swedish Meatballs',
                            :description => 'Hearty dish.',
                            :category => 'Entree')
chicken = MenuItem.create(  :name => 'Grilled chicken',
                            :description => 'This chicken is seasoned with rosemary and a little bit of vinegar.',
                            :category => 'Entree')
roast = MenuItem.create(  :name => 'Roast Beef',
                            :description => 'Perfectly cooked roast beef that will go great in sandwiches.',
                            :category => 'Entree')




salad = MenuItem.create(  :name => 'Caesar Salad',
                            :description => "Classic salad that is light on the dressing in this version",
                            :category => 'Side Dish')
mango = MenuItem.create(  :name => 'Mango Salad',
                            :description => "New take on a salad that is light and fresh",
                            :category => 'Side Dish')
potatoes = MenuItem.create(  :name => 'Mashed potatoes',
                            :description => "Creamy, light, and fluffy potatoes",
                            :category => 'Side Dish')
green_beans = MenuItem.create(  :name => 'Green Beans with Garlic',
                            :description => "Fresh crisp green beans seasoned with garlic and chilis",
                            :category => 'Side Dish')
squash = MenuItem.create(  :name => 'Summer Squash',
                            :description => "Cooked perfectly so they still retain crispness",
                            :category => 'Side Dish')
kale = MenuItem.create(  :name => 'Kale Salad',
                            :description => "Fresh kale salad seasoned with balsamic vinegar and strawberries.",
                            :category => 'Side Dish')



tahini_cookies = AddOn.create(:name => 'Tahini Cookies',
                              :description => '2 dozen light, tasty, and gluten free cookies!',
                              :price => 10
                              )
brownies = AddOn.create(:name => 'Brownies',
                              :description => '1 dozen fluffy, surprisingly dense, chocolatey brownies!',
                              :price => 12
                              )

user_1 = User.create( :email => 'tester@gmail.com',
                      :first_name => Faker::Name.first_name,
                      :last_name => Faker::Name.last_name,
                      :phone_number => Faker::PhoneNumber.cell_phone,
                      :password => 'password')

user_2 = User.create( :email => 'tester@gmail.com',
                      :first_name => Faker::Name.first_name,
                      :last_name => Faker::Name.last_name,
                      :phone_number => Faker::PhoneNumber.cell_phone,
                      :password => 'password')

user_3 = User.create( :email => 'tester@gmail.com',
                      :first_name => Faker::Name.first_name,
                      :last_name => Faker::Name.last_name,
                      :phone_number => Faker::PhoneNumber.cell_phone,
                      :password => 'password')
