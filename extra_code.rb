<div className="form color EventForm">
  <header className="section-header">
    <h3>Write Something</h3>
  </header>
  <div className="container smaller">
    <div className="row">
    <form onSubmit={this.handleSubmit} className="actionform">
      <div className="control-group">
        <input type="text" placeholder="Your Name" value={this.state.date} onChange={this.handleAuthorChange} required />
      </div>
      <div className="control-group">
        <textarea rows="5" placeholder="Your Entry" value={this.state.description} onChange={this.handleDescriptionChange} required></textarea>
      </div>
      <div className="clearfix"></div>
      <input type="submit" className="color" value="Leave Entry" />
      <div className="clearfix"></div>
    </form>
    </div>
  </div>
</div>

<section id="timeline">
    <header class="section-header">
        <h3 class="section-title">TIMELINE</h3>
        <p class="section-tagline">Here is a collection of the most cherished memories.</p>
    </header>
    <div class="container timeline">
      <span class="arrow-up"></span>
      <span class="arrow-down"></span>
      <div class="row">
        <div class="timeline-year start"><span>EVENTS</span></div>
          <div id="ordered-events">
            <% cache @events do %>
              <%= render partial: 'events/event', collection: @events %>
            <% end %>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="timeline-button">
          <% unless @events.total_pages < 2 %>
            <%= link_to 'Load More', load_events_memorial_path(id: @memorial.slug, event_page: 2), class: "button", id: "events-load", remote: true %>
          <% end %>
          <br /><br />

        </div>
      </div>
    </div>
</section>
<!-- #Timeline Section Ends -->

<!-- Modal HTML embedded directly into document -->
<div id="suggest-event" style="display:none;">
  <%= render 'memorials/event_form', object: @memorial  %>
</div>


<!-- Guestbook Section -->
<% cache @guestbook do %>
<section id="guestbook">
    <header class="section-header">
        <h3 class="section-title">Guestbook</h3>
        <p class="section-tagline">Please share any stories or memories of the deceased.</p>
    </header>
    <div class="container timeline">
        <span class="arrow-up"></span>
        <span class="arrow-down"></span>
        <div class="row">
            <div class="timeline-year start"><span>ENTRIES</span></div>

            <!-- display guestbook comments -->
            <div id="guestbook-comments">
              <% cache @comments do %>
                <%= render partial: 'comments/comment', collection: @comments %>
              <% end %>
            </div>

            <div class="clearfix"></div>
            <div class="timeline-button">
              <% unless @comments.total_pages < 2 %>
                <%= link_to 'Load More', load_comments_memorial_path(id: @memorial.slug, guestbook_page: 2), class: "button", id: "guestbook-comments-load", remote: true %>
              <% end %>
            </div>
        </div>
    </div>
    <div class="form color">
        <header class="section-header">
            <h3>Write Something</h3>
        </header>
        <div class="container smaller">
          <div class="row">
          <!-- guestbook form / comment code -->
          <%= form_for [@memorial, @guestbook, Comment.new], html: {class: "actionform"} do |f| %>
            <div class="control-group">
              <%= f.label :author, "Name" %>
              <%= f.text_field :author, required: true %>
            </div>
            <div class="control-group">
              <%= f.label :body, "Comment" %>
              <%= f.text_area :body, rows: 5, required: true %>
            </div>
            <div class="clearfix"></div>
            <%= f.submit "Leave Entry", class: "color" %>
            <div class="clearfix"></div>
          <% end %>
          </div>
        </div>
    </div>
</section>
<!-- #Guestbook Section Ends -->
<% end %>

<!-- Gift Section
<section id="gift" class="pattern">
    <header class="section-header">
        <h3 class="section-title">Condolence Gift</h3>
        <p class="section-tagline">Send a simple bereavement gift such as flowers or chocolates.</p>
    </header>
    <div class="container">
        <ul class="small-box corner">
            <li>
                <a class="product" href="#"><img src="<%= asset_path 'yes/gifts/registry-amazon.png' %>" alt=""></a>
                <div class="corners-topleft"></div>
                <div class="corners-bottomleft"></div>
                <div class="corners-topright"></div>
                <div class="corners-bottomright"></div>
            </li>
            <li>
                <a class="product" href="#"><img src="<%= asset_path 'yes/gifts/registry-crate.png' %>" alt=""></a>
                <div class="corners-topleft"></div>
                <div class="corners-bottomleft"></div>
                <div class="corners-topright"></div>
                <div class="corners-bottomright"></div>
            </li>
            <li>
                <a class="product" href="#"><img src="<%= asset_path 'yes/gifts/registry-macys.png' %>" alt=""></a>
                <div class="corners-topleft"></div>
                <div class="corners-bottomleft"></div>
                <div class="corners-topright"></div>
                <div class="corners-bottomright"></div>
            </li>
            <li>
                <a class="product" href="#"><img src="<%= asset_path 'yes/gifts/registry-tiffany.png' %>" alt=""></a>
                <div class="corners-topleft"></div>
                <div class="corners-bottomleft"></div>
                <div class="corners-topright"></div>
                <div class="corners-bottomright"></div>
            </li>
        </ul>
    </div>
</section>
#Gift Section Ends -->

<script type="text/babel">
  var ContactBox = React.createClass({
    handleContactSubmit: function(message) {
      console.log(message);
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: message,
        success: function(data) {
          console.log(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    getInitialState: function() {
      return { data: [] };
    },

    render: function() {
      return (
        <div className="ContactBox">
          <div className="col-md-8">
            <ContactForm onContactSubmit={this.handleContactSubmit} />
          </div>
          <div className="col-md-4">
            <h4 className="contact-title">Contact Info </h4>
            <p>Contact us if you have any feedback or questions. We are always looking for testimonials from people that love our site as well as requests for new features.</p>
          </div>
        </div>
      )
    }
  });

  var ContactForm = React.createClass({
    getInitialState: function() {
      return {
        name: '',
        email: '',
        content: ''
      };
    },

    handleSubmit: function(e) {
      e.preventDefault();
      var message = new Object();

      this.props.onContactSubmit({
        message: {
          name: this.state.name,
          email: this.state.email,
          content: this.state.content
        }
      });
    },

    validateEmail: function(value) {
      // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value);
    },

    commonValidate: function(value) {
      return (value ? true : false);
    },

    setName: function(event) {
      this.setState({
        name: event.target.value
      });
    },

    setEmail: function(event) {
      this.setState({
        email: event.target.value
      });
    },

    setContent: function(event) {
      this.setState({
        content: event.target.value
      });
    },

    render: function() {
      return (
        <form className="ContactForm" onSubmit={this.handleSubmit}>

        <TextInput
         uniqueName="name"
         text="Your Name"
         required={true}
         minCharacters={3}
         validate={this.commonValidate}
         onChange={this.setName}
         errorMessage="Name is invalid"
         emptyMessage="Name is required" />

        <TextInput
           uniqueName="email"
           text="Email Address"
           required={true}
           minCharacters={6}
           validate={this.validateEmail}
           onChange={this.setEmail}
           errorMessage="Email is invalid"
           emptyMessage="Email is required" />

         <TextArea
          uniqueName="content"
          text="Message"
          required={true}
          minCharacters={30}
          validate={this.commonValidate}
          onChange={this.setContent}
          errorMessage="Message is invalid"
          emptyMessage="Message is required" />
         <br /><br />

          <input type="submit" className="submit-btn submit md-btn btn" value="Send Now" />
        </form>
      );
    }
  });

  var InputError = React.createClass({
    getInitialState: function() {
      return {
        message: 'Input is invalid'
      };
    },

    render: function() {
      var errorClass = classNames(this.props.className, {
        'error_container': true,
        'visible': this.props.visible,
        'invisible': !this.props.visible
      });

      return (
        <div className={errorClass}>
          <span>{this.props.errorMessage}</span>
        </div>
      )
    }
  });

  var TextInput = React.createClass({
    getInitialState: function() {
      return {
        isEmpty: true,
        value: null,
        valid: false,
        errorMessage: "Input is invalid",
        errorVisible: false
      };
    },

    handleChange: function(event) {
      this.validation(event.target.value);

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    },

    validation: function(value, valid) {
      if (typeof valid === 'undefined') {
        valid = true;
      }

      var message = "";
      var errorVisible = false;

      if (!valid) {
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      } else if (this.props.required && jQuery.isEmptyObject(value)) {
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      } else if (value.length < this.props.minCharacters) {
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      }

      this.setState({
        value: value,
        isEmpty: jQuery.isEmptyObject(value),
        valid: valid,
        errorMessage: message,
        errorVisible: errorVisible
      });
    },

    handleBlur: function(event) {
      var valid = this.props.validate(event.target.value);
      this.validation(event.target.value, valid);
    },

    render: function() {
      return (
        <div className={this.props.uniqueName}>
          <input
            placeholder={this.props.text}
            className={'form-control input input-' + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.state.value} />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage} />
        </div>
      );
    }
  });

  var TextArea = React.createClass({
    getInitialState: function() {
      return {
        isEmpty: true,
        value: null,
        valid: false,
        errorMessage: "Input is invalid",
        errorVisible: false
      };
    },

    handleChange: function(event) {
      this.validation(event.target.value);

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    },

    validation: function(value, valid) {
      if (typeof valid === 'undefined') {
        valid = true;
      }

      var message = "";
      var errorVisible = false;

      if (!valid) {
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      } else if (this.props.required && jQuery.isEmptyObject(value)) {
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      } else if (value.length < this.props.minCharacters) {
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      }

      this.setState({
        value: value,
        isEmpty: jQuery.isEmptyObject(value),
        valid: valid,
        errorMessage: message,
        errorVisible: errorVisible
      });
    },

    handleBlur: function(event) {
      var valid = this.props.validate(event.target.value);
      this.validation(event.target.value, valid);
    },

    render: function() {
      return (
        <div className={this.props.uniqueName}>
          <textarea
            placeholder={this.props.text}
            className={'form-control input input-' + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            rows='5'
            value={this.state.value}></textarea>

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage} />
        </div>
      );
    }
  });

  ReactDOM.render(
    <ContactBox url="/api/v1/contact_admin" />,
    document.getElementById('react-contact-section')
  )
</script>

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
