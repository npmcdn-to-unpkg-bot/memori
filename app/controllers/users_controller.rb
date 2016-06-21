class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update]

  def show
  end

  def new
    redirect_to memorials_path if current_user

    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "Registration Successful!"
      redirect_to new_memorial_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:notice] = "Your profile has been updated."
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :password, :email, :name)
    end

    def set_user
      @user = User.find(params[:id])
    end

end
