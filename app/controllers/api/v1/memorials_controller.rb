class Api::V1::MemorialsController < Api::V1::BaseController
  def home_memorials
    @memorials = Memorial.order('created_at DESC').limit(4).where(protect: false)

    render json: @memorials, layout: false
  end
end
