class MailChimp

  def initialize user
    @user = user
  end

  def subscribe_to_mailchimp testing=false
    return true if (Rails.env.test? && !testing)
    list_id = ENV['MAILCHIMP_LIST_ID']
    response = Rails.configuration.mailchimp.lists.subscribe({
      id: list_id,
      email: { email: @user.email },
      merge_vars: {
        'FNAME'=> @user.first_name,
        'LNAME'=> @user.last_name
      },
      double_optin: false,
      update_existing: true
      })
    response
  end

  def unsubscribe_to_mailchimp testing=false
    return true if (Rails.env.test? && !testing)
    list_id = ENV['MAILCHIMP_LIST_ID']
    response = Rails.configuration.mailchimp.lists.unsubscribe({
      id: list_id,
      email: { email: @user.email },
      delete_member: true
      })
    response
  end

end
