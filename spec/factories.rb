FactoryGirl.define do
  factory :subscription do
    sequence(:description) {|n| "description #{n}"  }
    sequence(:price) {|n| n }
    sequence(:weeks) {|n| n }
    sequence(:meals) {|n| n }
  end

  factory :promotion do
    sequence(:code) {|n| "PROMOCODE#{n}"}
    sequence(:description) {|n| "promo description #{1}"}
    discount_type { %w[$ %].sample }
    discount_amount { %w[5 10 15 20].sample }
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
    sequence(:category) {|n| MenuItem::CATEGORIES.sample  }
  end

  factory :add_on do
    sequence(:name) {|n| "name #{n}"}
    sequence(:description) {|n| "description #{n}"  }
    sequence(:price) {|n| n }
    trait :active do
      active true
    end
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
