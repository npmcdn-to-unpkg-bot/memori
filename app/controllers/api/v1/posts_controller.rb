class Api::V1::PostsController < Api::V1::BaseController
  def index
    @posts = Post.order('created_at DESC').paginate(page: params[:page], per_page: 5)
    render json: @posts, layout: false
  end

  def show
    respond_with Post.find_by_slug(params[:id])
  end

  def home_posts
    respond_with Post.order('created_at DESC').limit(4)
  end

end
