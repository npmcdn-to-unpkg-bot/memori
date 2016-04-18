class CommentsController < ApplicationController
  def create
    @memorial = Memorial.find(params[:memorial_id])
    @comment =  @memorial.comments.build(params.require(:comment).permit(:body))
    @comment.user = User.first #replace after setup auth

    if @comment.save
      flash[:notice] = "your comment was added."
      redirect_to memorial_path(@memorial)
    else
      render 'memorials/show'
    end
  end

end
