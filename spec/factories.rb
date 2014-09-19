FactoryGirl.define do
  factory :subscription do
    sequence(:description) {|n| "description #{n}"  }
    sequence(:price) {|n| n }
    sequence(:weeks) {|n| n }
    sequence(:meals) {|n| n }
  end

  factory :menu do
    sequence(:title) {|n| "title #{n}"}
  end

  factory :user do
    email { Faker::Internet.email }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    phone_number { Faker::PhoneNumber.phone_number }
    password "password"
    trait :admin do
      admin true
    end
  end
end
