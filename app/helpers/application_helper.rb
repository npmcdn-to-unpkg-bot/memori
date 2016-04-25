module ApplicationHelper
  def display_datetime(dt)
    dt.strftime("%B %d, %Y")
    # dt.strftime("%m/%d/%Y %l:%M%P %Z") full time with seconds and UTC
  end

  def display_short_date(dt)
    dt.strftime("%m/%d/%Y")
  end

  def display_year(dt)
    dt.strftime("%Y")
  end
end
