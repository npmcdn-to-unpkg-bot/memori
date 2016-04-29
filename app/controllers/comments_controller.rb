class CommentsController < ApplicationController
  def create
    @memorial = Memorial.find(params[:memorial_id])
    # will this work for other forms?

    @comment = @commentable.comments.new(comment_params)

    if @comment.save
      flash[:notice] = "your comment was added."
      redirect_to memorial_path(@memorial)
    else
      render 'memorials/show'
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:author, :body)
  end
end
