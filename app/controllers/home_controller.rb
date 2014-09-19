class HomeController < ApplicationController
  before_filter :redirect_to_dashboards!, :only => [:index]
  def index

  end
end
