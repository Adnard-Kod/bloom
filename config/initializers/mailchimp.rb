if Rails.env.test?
  Gibbon::Export.api_key = ENV['MAILCHIMP_KEY']
  Gibbon::Export.throws_exceptions = false
end

Rails.configuration.mailchimp = Gibbon::API.new(ENV['MAILCHIMP_KEY'])
