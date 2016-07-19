class Api::V1::EventsController < Api::V1::BaseController
  before_action :set_memorial

  def create
    @event = @memorial.events.build(event_params)
    @event.published = false
    NotificationMailer.new_event(@memorial.user).deliver_now

    if @event.save
      render json: @memorial.events.where(published: true), layout: false
    end
  end

  def visitor
  end

  private

    def set_memorial
      @memorial = Memorial.find_by_slug(params[:memorial_id])
    end


    def event_params
      params.require(:event).permit(:date, :title, :description, :picture, :published)
    end
end
