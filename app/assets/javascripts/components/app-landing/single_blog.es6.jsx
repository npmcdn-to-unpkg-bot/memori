class SingleBlog extends React.Component {
  state = {
    post: {},
    picture: ''
  }

  getPost(URL) {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: URL,
      success: (response) => {
        this.setState({ post: response, picture: response.picture.url });
        console.log(this.state);
      }.bind(this)
    });
  }

  componentDidMount() {
    this.getPost(`/api/v1/posts/${this.props.post_id}.json`);
  }

  componentDidUpdate() {

  }

  render () {
    return (
      <div className="col-md-12 post-container" role="main">
        <article className="post">
          <div className="post-thumbnail">
            <figure>
            <img src={this.state.picture} />
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
