class PostsController < ApplicationController
  def index
    @posts = Post.order('created_at DESC').paginate(page: params[:page], per_page: 5)
  end

  def show
  end
end
