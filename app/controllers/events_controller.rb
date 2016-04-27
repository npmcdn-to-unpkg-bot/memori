class EventsController < ApplicationController
  before_action :set_memorial
  before_action :require_user
  before_action :require_creator

  def new
    @event = Event.new

    respond_to do |format|
      format.js
    end
  end

  def create
    @event = @memorial.events.build(params.require(:event).permit(:date, :title, :description, :picture))

    respond_to do |format|
      format.html do
        if @event.save
          flash[:notice] = "your event was added."
          redirect_to edit_memorial_path(@memorial)
        else
          flash[:notice] = "problem adding your event."
          redirect_to edit_memorial_path(@memorial)
        end
      end

      format.js do
        @events = @memorial.events
      end
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy if @memorial.events.include?(event)

    respond_to do |format|
      format.html do
        redirect_to :back
      end

      format.js do
        @events = @memorial.events
      end
    end

  end

  private

    def set_memorial
      @memorial = Memorial.find(params[:memorial_id])
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
