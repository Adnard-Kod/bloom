FactoryGirl.define do
  factory :user do
    first_name    "John"
    last_name     "Smith"
    email         "john@gmail.com"
    phone_number  "555-555-5454"
    password      "password"
  end
end
