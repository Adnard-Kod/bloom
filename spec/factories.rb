FactoryGirl.define do
  factory :subscription do
    sequence(:description) {|n| "description #{n}"  }
    sequence(:price) {|n| n }
    sequence(:weeks) {|n| n }
    sequence(:meals) {|n| n }
  end
end
