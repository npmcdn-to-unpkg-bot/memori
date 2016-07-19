class PostsBox extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

  }

  showPosts(response) {
    this.setState({
      posts: response
    })
  }

  getPosts(URL) {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: URL,
      success: (response) => {
        this.showPosts(response);
      }.bind(this)
    });
  }

  componentDidMount() {
    this.getPosts('/api/v1/home_posts.json');
  }

  render () {
    return (
      <div>
        <PostsListing posts={this.state.posts} />
      </div>
    );
  }
}
