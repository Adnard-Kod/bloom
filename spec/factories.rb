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
end
