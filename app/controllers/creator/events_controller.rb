class Creator::EventsController < CreatorController
  before_action :set_memorial
  before_action :set_event, only: [:edit, :update, :destroy]
  before_action :require_user
  before_action :require_creator, only: [:edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, only: [:create]

  def new
    @event = Event.new

    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @event = @memorial.events.build(event_params)

    if @event.save
      flash[:notice] = "Your event was added."
      redirect_to :back
    else
      flash[:notice] = "Problem adding your event."
      redirect_to :back
    end
  end

  def edit
    respond_to do |format|
      format.html
      format.js
    end
  end

  def update
    @event.update_attributes(event_params)

    respond_to do |format|
      format.html do
        if @event.update(event_params)
          flash[:notice] = "Your event was updated."
          redirect_to edit_events_creator_memorial_path(@memorial)
        else
          render :edit
        end
      end

      format.js do
        @events = @memorial.events
      end
    end
  end

  def destroy
    @event.destroy if @memorial.events.include?(@event)

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
      @memorial = Memorial.find_by_slug(params[:memorial_id])
    end

    def set_event
      @event = Event.find_by_id(params[:id])
    end

    def event_params
      params.require(:event).permit(:date, :title, :description, :picture, :published)
    end

    def require_creator
      access_denied unless logged_in? and (current_user == @memorial.user || current_user.admin?)
    end

end
