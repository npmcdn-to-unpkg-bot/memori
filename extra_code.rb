#blog pagination

<%= render 'shared/content_title', title: "Blog" %>

<div id="obituaries-page" class="page obituaries-page page-container">
	<div class="container">
		<div class="row">
			<div id="post-container" class="col-md-12 post-container" role="main">
				<div id="posts">
					<% cache @posts do %>
						<%= render partial: 'posts/post', collection: @posts %>
					<% end %>
				</div>
			</div>
		</div>
	</div>
</div>

<% cache 'blog-pagination' do %>
	<nav style="text-align: center;">
	  <ul class="pagination">
	    <%= will_paginate @posts, class: 'digg_pagination' %>
	  </ul>
	</nav>
<% end %>


# Contact form
<div class="col-md-8">
<%= form_for Message.new, url: url_for(controller: 'pages', action: 'contact'), html: {class: "actionform"} do |f| %>
    <div class="control-group column six">
      <%= f.text_field :name, class: "form-control", placeholder: "Your Name", required: true %>
    </div>
    <div class="control-group column six">
      <%= f.email_field :email, class: "form-control", placeholder: "Your Email", type: 'email', required: true %>
    </div>
    <div class="control-group column twelve">
      <%= f.text_area :content, rows: 5, class: "form-control", placeholder: "Message", required: true %>
    </div>
    <div class="clearfix"></div>
    <%= f.submit "Send Now", class: "submit-btn submit md-btn btn" %>
    <div class="clearfix"></div>
  <% end %>
</div>



<TextArea
 uniqueName="content"
 text="Message"
 required={true}
 minCharacters={30}
 validate={this.commonValidate}
 errorMessage="Message is invalid"
 emptyMessage="Message is required" />
<br /><br />


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
