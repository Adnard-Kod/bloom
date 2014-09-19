module Stubber
  def stub_current_user controller, user
    allow(controller).to receive(:current_user) { user }
  end
end
