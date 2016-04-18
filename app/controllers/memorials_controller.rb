class MemorialsController < ApplicationController
  def index
    @memorials = Memorial.all
  end

  def show
    @memorial = Memorial.find(params[:id])
  end

  def new
    @memorial = Memorial.new
  end

  def create
  end
end
