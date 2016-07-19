class Api::V1::CommentsController < Api::V1::BaseController
  def create
    @memorial = Memorial.find_by_slug(params[:memorial_id])
    @comment = @commentable.comments.new(comment_params)

    if @comment.save
      render json: @commentable.comments, layout: false
    end

  end

  private

    def comment_params
      params.require(:comment).permit(:author, :body)
    end

end
