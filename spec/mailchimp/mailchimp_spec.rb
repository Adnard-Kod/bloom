require 'rails_helper'

describe "#subscribe_to_mailchimp" do
   let(:user) { FactoryGirl.create(:user) }
   it "calls mailchimp correctly" do
     opts = {
       email: {email: user.email},
       id: ENV['MAILCHIMP_LIST_ID'],
       double_optin: false,
     }
     clazz = Rails.configuration.mailchimp.lists.class
     clazz.any_instance.should_receive(:subscribe).with(opts).once
     user.send(:subscribe_to_mailchimp, true)
   end
 end
