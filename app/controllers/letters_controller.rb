class LettersController < ApplicationController
  def create
    @letter = Letter.new(params.require(:letter).permit(:name, :email, :subject, :content))

    if @letter.valid?
      LetterMailer.contact_admin(@letter).deliver_now
      if request.env["HTTP_REFERER"].present? and request.env["HTTP_REFERER"] != request.env["REQUEST_URI"]
        redirect_to root_path
      else
        flash[:notice] = "your message has been sent"
      end
    else
      flash[:alert] = "An error occured while delivering this message."
      redirect_to :back
    end
  end
end
