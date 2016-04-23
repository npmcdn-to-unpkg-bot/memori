class Memorials::CommentsController < CommentsController
  before_action :set_commentable

  private

    def set_commentable
      @commentable = Memorial.find(params[:memorial_id])
    end
end
