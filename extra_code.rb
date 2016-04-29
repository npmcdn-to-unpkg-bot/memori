<%= render 'events/form' %>


<% @memorial.reload.events.each_with_index do |event, index| %>
  <tr>
    <th scope="row"><%= index + 1 %></th>
    <td><%= event.title %></td>
    <td><%= display_short_date(event.date) %></td>
    <td><%= image_tag event.picture.url(:thumb) if event.picture? %></td>
    <td><%= truncate(event.description, length: 50, separator: '') %></td>
    <td><%= link_to "Edit" %></td>
    <td><%= link_to "Delete", memorial_event_path(@memorial, event), method: :delete, data: { confirm: "Are you sure?" } %></td>
  </tr>
<% end %>


<head>
<style>
  .hero {
      background-image: url(<%= @memorial.hero.url if @memorial.hero %>);
  }
</style>
</head>



    <h5>Comments:</h5>




    <h4>Comments</h4>

    <% @memorial.reload.comments.each do |comment| %>
      <div>
        <%= comment.body %>
        by: <%= comment.author %>
        <%= display_datetime(comment.created_at) %>
      </div>
      <br>
    <% end %>


    <% @memorial.reload.comments.each_with_index do |comment, index| %>
      <%= render 'comments/guestbook', comment: comment, index: index %>
    <% end %>



    <%= form_for [@memorial, @event, @comment], html: {class: "actionform"} do |f| %>
      <%= render 'shared/errors', obj: @comment %>
      <div class="control-group">
        <%= f.label :author, "Name" %>
        <%= f.text_field :author %>
      </div>
      <div class="control-group">
        <%= f.label :body, "Comment" %>
        <%= f.text_area :body, rows: 5 %>
      </div>
      <div class="clearfix"></div>
      <%= f.submit "Leave Entry", class: "color" %>
      <div class="clearfix"></div>
    <% end %>


    # def create
    #   @memorial = Memorial.find(params[:memorial_id])
    #   @comment =  @memorial.comments.build(params.require(:comment).permit(:author, :body))
    #
    #   if @comment.save
    #     flash[:notice] = "your comment was added."
    #     redirect_to memorial_path(@memorial)
    #   else
    #     render 'memorials/show'
    #   end
    # end
