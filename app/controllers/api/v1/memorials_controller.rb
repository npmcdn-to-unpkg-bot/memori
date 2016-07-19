class Api::V1::MemorialsController < Api::V1::BaseController
  before_action :set_memorial, only: [:guestbook_comments, :events, :photos]

  def home_memorials
    @memorials = Memorial.order('created_at DESC').limit(4).where(protect: false)
    render json: @memorials, layout: false
  end

  def guestbook_comments
    @guestbook = Guestbook.find_by(memorial: @memorial)
    @comments = @guestbook.comments.paginate(page: params[:guestbook_page], per_page: 5)
    render json: @comments, layout: false
  end

  def events
    @events = @memorial.events.where(published: true).paginate(page: params[:event_page], per_page: 5)

    render json: @events, layout: false
  end

  def photos
    @photos = @memorial.photos.where(published: true)
    render json: @photos, layout: false
  end

  private

    def set_memorial
      @memorial = Memorial.find_by_slug(params[:id])
    end
end
