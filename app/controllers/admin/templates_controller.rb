class Admin::TemplatesController < AdminsController
  before_action :set_template, only: [:edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  def index
    @templates = Template.all
  end

  def new
    @template = Template.new

    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @template = Template.new(template_params)

    respond_to do |format|
      format.html do
        if @template.save
          flash[:notice] = "Your template was created"
          redirect_to :back
        else
          render :new
        end
      end

      format.js do
        @templates = Template.all
      end
    end
  end

  def edit
    respond_to do |format|
      format.html
      format.js
    end
  end

  def update
    @template.update_attributes(template_params)

    respond_to do |format|
      format.html do
        if @template.update(template_params)
          flash[:notice] = "Your template was updated."
          redirect_to admin_templates_path
        else
          render :edit
        end
      end

      format.js do
        @templates = Template.all
      end
    end
  end

  def destroy
    @template.destroy

    respond_to do |format|
      format.html do
        if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
          redirect_to :back
        else
          redirect_to admin_templates_path
        end
      end

      format.js do
        @templates = Template.all
      end

    end
  end

  private

    def template_params
      params.require(:template).permit(:name, :theme, :variant)
    end

    def set_template
      @template = Template.find(params[:id])
    end
end
