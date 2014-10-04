module Stubber
  def stub_current_user controller=nil, user
    allow(controller).to receive(:current_user) { user }
  end
  def stub_current_admin_user user
    allow_any_instance_of(ApplicationController).to receive(:current_user) { user }
    allow_any_instance_of(UserController).to receive(:current_user) { user }
    allow_any_instance_of(AdminController).to receive(:current_user) { user }
  end
end
