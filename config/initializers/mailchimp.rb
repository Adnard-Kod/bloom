if Rails.env.test?
  Gibbon::Export.api_key = "76c28ec4d2dd47abd2a4acf7b059ab99-us9"
  Gibbon::Export.throws_exceptions = false
end

Rails.configuration.mailchimp = Gibbon::API.new("76c28ec4d2dd47abd2a4acf7b059ab99-us9")
