class SessionsController < ApplicationController
  def new
    redirect_to memorials_path if current_user
  end

  def create
    user = User.where(username: params[:username]).first

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      flash[:notice] = "welcome to the app"
      redirect_to root_path
    else
      flash[:error] = "there was something wrong"
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:notice] = "you have logged out"
    redirect_to root_path
  end
end
