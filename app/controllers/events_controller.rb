class EventsController < ApplicationController

  def create
    @memorial = Memorial.find(params[:memorial_id])
    @event =  @memorial.events.build(params.require(:event).permit(:date, :title, :description, :picture))

    if @event.save
      flash[:notice] = "your event was added."
      redirect_to edit_memorial_path(@memorial)
    else
      flash[:notice] = "problem adding your event."
      redirect_to edit_memorial_path(@memorial)
    end
  end

end
