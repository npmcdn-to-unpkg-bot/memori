class Api::V1::PostsController < Api::V1::BaseController
  def index
    respond_with Post.all
  end

  def home_posts
    respond_with Post.order('created_at DESC').limit(4)
  end
end
