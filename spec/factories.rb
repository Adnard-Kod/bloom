FactoryGirl.define do
  factory :subscription do
    sequence(:description) {|n| "description #{n}"  }
    sequence(:price) {|n| n }
    sequence(:weeks) {|n| n }
    sequence(:meals) {|n| n }
  end

  factory :menu do
    sequence(:title) {|n| "title #{n}"}
    trait(:current) do
      current true
    end
  end

  factory :menu_item do
    sequence(:name) {|n| "name #{n}"}
    sequence(:description) {|n| "description #{n}"  }
    sequence(:category) {|n| ["Entre", "Sidedish"].sample  }
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

  factory :address do
    street_address { Faker::Address.street_address }
    apartment_number { Faker::Address.secondary_address }
    city 'San Francisco'
    state 'CA'
    zipcode { Faker::Address.zip_code }
    delivery_instructions { Faker::Lorem.paragraph }
    user
  end
end
