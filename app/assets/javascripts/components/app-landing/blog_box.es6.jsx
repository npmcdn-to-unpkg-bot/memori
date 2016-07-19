class BlogBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page_number: this.props.page_number,
      total_pages: this.props.total_pages
    };

  }

  loadPosts() {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: `/api/v1/posts.json?page=${this.state.page_number}`,
      success: (data) => {
        data.map((post) => { this.state.posts.push(post) });
        this.setState({ page_number: this.state.page_number + 1 });
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  }

  handlePagination() {
    this.loadPosts();
  }

  componentDidMount() {
    this.loadPosts();
  }

  render () {
    return (
      <div>
        <BlogListing posts={this.state.posts} />
        <br /><br />
        { this.state.page_number <= this.state.total_pages ? (
          <BlogPagination onPaginationSubmit={this.handlePagination.bind(this)} />
        ) : '' }
        <br /><br />
      </div>
    );
  }
}
