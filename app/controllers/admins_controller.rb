class AdminsController < ApplicationController
  before_action :require_admin

  layout 'admin'

  def require_admin
    access_denied unless logged_in? || current_user.admin?
  end
end
