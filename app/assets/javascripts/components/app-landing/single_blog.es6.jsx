class SingleBlog extends React.Component {
  constructor() {
    super();

    this.state = {
      post: []
    };

  }

  showPost(response) {
    this.setState({
      post: response
    })
  }

  getPost(URL) {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: URL,
      success: (response) => {
        this.showPost(response);
      }.bind(this)
    });
  }

  componentDidMount() {
    this.getPost(`/api/v1/posts/${this.props.post_id}.json`);
  }

  render () {
    return (
      <div className="col-md-12 post-container" role="main">
        <article className="post">
          <div className="post-thumbnail">
            <figure>
            <img src={this.state.post.picture} />
              <figcaption>
                <h1 className="image-caption">
                  {this.state.post.title}
                </h1>
              </figcaption>
            </figure>
          </div>
          <div className="post-content">
            <div className="entry" dangerouslySetInnerHTML={{ __html: this.state.post.body}}>

            </div>
          </div>
        </article>

        <div id="disqus_thread"></div>
      </div>
    );
  }
}
