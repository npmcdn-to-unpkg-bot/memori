class SessionsController < ApplicationController
  def new
    redirect_to creator_memorials_path if current_user
  end

  def create
    user = User.where(username: params[:username]).first

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      flash[:notice] = "Welcome to the Memori App."
      redirect_to current_user.admin? ? admin_posts_path : creator_memorials_path
    else
      flash[:error] = "You provided the wrong username or password."
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:notice] = "You have logged out."
    redirect_to root_path
  end
end
