class Api::V1::Guestbooks::CommentsController < Api::V1::CommentsController
  before_action :set_commentable
  skip_before_filter :verify_authenticity_token

  private

    def set_commentable
      @commentable = Guestbook.find(params[:guestbook_id])
    end
end
