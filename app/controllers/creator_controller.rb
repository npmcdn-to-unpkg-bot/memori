class CreatorController < ApplicationController
  before_action :require_user

  def require_user
    access_denied unless logged_in?
  end
end
