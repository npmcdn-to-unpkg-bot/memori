class Admin::PostsController < AdminsController
  before_action :set_post, only: [:edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new

    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @post = Post.new(post_params)

    respond_to do |format|
      format.html do
        if @post.save
          flash[:notice] = "Your post was created"
          redirect_to :back
        else
          render :new
        end
      end

      format.js do
        @posts = Post.all
      end
    end
  end

  def edit
    respond_to do |format|
      format.html
      format.js
    end
  end

  def update
    @post.update_attributes(post_params)

    respond_to do |format|
      format.html do
        if @post.update(post_params)
          flash[:notice] = "Your post was updated."
          redirect_to posts_path
        else
          render :edit
        end
      end

      format.js do
        @posts = Post.all
      end
    end
  end

  def destroy
    @post.destroy

    respond_to do |format|
      format.html do
        if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
          redirect_to :back
        else
          redirect_to posts_path
        end
      end

      format.js do
        @posts = Post.all
      end

    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :picture, :body)
    end

    def set_post
      @post = Post.find(params[:id])
    end
end
