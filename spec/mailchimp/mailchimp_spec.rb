require 'rails_helper'

describe "#subscribe_to_mailchimp" do
 let(:user) { FactoryGirl.create(:user) }
 xit "calls mailchimp correctly" do
   mailchimp = MailChimp.new(user)
   opts = {
     email: {email: user.email},
     merge_vars: {"FNAME" => user.first_name, "LNAME" => user.last_name},
     id: ENV['MAILCHIMP_LIST_ID'],
     double_optin: false,
     update_existing: true
   }
   clazz = Rails.configuration.mailchimp.lists.class
   allow(clazz.any_instance).to receive(:subscribe).with(opts).once
   mailchimp.send(:subscribe_to_mailchimp, true)
 end
end
