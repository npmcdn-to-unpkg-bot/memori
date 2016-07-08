class PostsController < ApplicationController
  respond_to :html, :json

  def index
    # @posts = Post.order('created_at DESC').paginate(page: params[:page], per_page: 5)
  end

  def show
    # @post = Post.find(params[:id])
    #
    # if stale?(@post)
    #   respond_with @post
    # end

  end
end
