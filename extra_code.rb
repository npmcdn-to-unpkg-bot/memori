## Photos Upload

<div class="col-md-3 col-sm-4 col-xs-6">
  <div class="member">
    <div class="member-avatar"><%= image_tag photo.picture.url(:thumb) if photo.picture? %></div>
    <div class="member-details">
      <h4 class="name"><a><%= best_in_place photo, :caption, url: creator_memorial_photo_path(@memorial, photo) %></a></h4><!-- /.name -->
      <h6><%= link_to "Delete", creator_memorial_photo_path(@memorial, photo), remote: true, method: :delete, data: { confirm: "Are you sure?" } %></h6>
    </div><!-- /.member-details -->
  </div><!-- /.member -->
</div>

<div id="team-page" class="page team-page page-container text-center">
  <div>
    <div class="row" id="photos">
      <%= render partial: "creator/photos/photo", collection: @photos.rank(:position) %>
    </div><!-- /.row -->
  </div><!-- /.container -->
</div><!-- /#about-page -->

<%= form_for [@memorial, @photo] do |f| %>
  <%= f.label :picture, "Upload Multiple Photos:" %>
  <%= f.file_field :picture, multiple: true, name: "photo[picture]", class: 'form-control' %>
<% end %>

<div id="photo-form" style="display:none;"></div>
<br><br>


## Caching
<% cache([:v1, @memorial]) do %>
<% cache([:v1, :partial_event, event]) %>


<% if @memorial.picture.url.nil? %>
<style>
  .hero {
    background-image: url(<%= asset_path 'yes/hero.jpg' %>);
  }
</style>
<% else %>
<style>
  .hero {
    background-image: url(<%= @memorial.picture.url %>);
  }
</style>
<% end %>




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
