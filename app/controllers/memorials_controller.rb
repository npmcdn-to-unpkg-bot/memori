class MemorialsController < ApplicationController
  before_action :set_memorial, only: [:show, :edit, :update]

  def index
    @memorials = Memorial.all
  end

  def show
    @comment = Comment.new
  end

  def new
    @memorial = Memorial.new
  end

  def create
    @memorial = Memorial.new(memorial_params)

    if @memorial.save
      flash[:notice] = "Your memorial was save."
      redirect_to memorials_path
    else
      render :new
    end
  end

  def edit; end

  def update
    if @memorial.update(memorial_params)
      flash[:notice] = "Your memorial was updated."
      redirect_to memorial_path(@memorial)
    else
      render :edit
    end
  end

  private

  def memorial_params
    params.require(:memorial).permit(:name, :biography)
  end

  def set_memorial
    @memorial = Memorial.find(params[:id])
  end
end
