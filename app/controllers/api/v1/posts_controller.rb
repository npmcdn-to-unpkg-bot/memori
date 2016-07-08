class Api::V1::PostsController < Api::V1::BaseController
  def index
    # respond_with Post.order('created_at DESC').paginate(page: params[:page], per_page: 5)
    respond_with Post.order('created_at DESC')
  end

  def show
    respond_with Post.find(params[:id])
  end

  def home_posts
    respond_with Post.order('created_at DESC').limit(4)
  end

end
