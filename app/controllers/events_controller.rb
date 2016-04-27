class EventsController < ApplicationController
  before_action :set_memorial
  before_action :require_user
  before_action :require_creator
  respond_to :html, :js

  def new
    @event = Event.new
  end

  def create
    @event =  @memorial.events.build(params.require(:event).permit(:date, :title, :description, :picture))

    if @event.save
      flash[:notice] = "your event was added."
      redirect_to edit_memorial_path(@memorial)
    else
      flash[:notice] = "problem adding your event."
      redirect_to edit_memorial_path(@memorial)
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy if @memorial.events.include?(event)
    redirect_to :back
  end

  private

    def set_memorial
      @memorial = Memorial.find(params[:memorial_id])
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
