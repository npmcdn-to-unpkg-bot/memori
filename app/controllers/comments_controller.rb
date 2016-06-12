class CommentsController < ApplicationController
  def create
    @memorial = Memorial.find_by_id(params[:memorial_id])

    # will this work for other forms?

    @comment = @commentable.comments.new(comment_params)

    respond_to do |format|
      format.html do
        if @comment.save
          flash[:notice] = "your comment was added."
          puts @memorial
          redirect_to memorial_path(@memorial)
        else
          render 'memorials/show'
        end
      end

      format.js do

      end
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:author, :body)
    end

end
