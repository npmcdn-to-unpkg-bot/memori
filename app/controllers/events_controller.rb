class EventsController < ApplicationController
  before_action :set_memorial
  skip_before_filter :verify_authenticity_token, only: [:create]

  def create
    @event = @memorial.events.build(event_params)
    @event.published = false

    NotificationMailer.new_event(@memorial.user).deliver_now

    if @event.save
      flash[:notice] = "Your event was submitted."
      redirect_to :back
    else
      flash[:notice] = "Problem adding your event."
      redirect_to :back
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
