class Guestbooks::CommentsController < CommentsController
  before_action :set_commentable

  private

    def set_commentable
      @commentable = Guestbook.find(params[:guestbook_id])
    end
end
