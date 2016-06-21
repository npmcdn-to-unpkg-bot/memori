class AdminsController < AuthenticatedController
  before_action :require_admin

  def require_admin
    access_denied unless logged_in? || current_user.admin?
  end
end
