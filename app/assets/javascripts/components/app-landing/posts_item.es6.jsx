class PostsItem extends React.Component {
  render () {
    let day = moment(this.props.created).format('MMMM D, YYYY');
    return (
      <div className="col-md-3 col-sm-6">
        <article className="post-content">
          <div className="featured-img">
            <img src={this.props.img_src} alt="Image" className="blog-post-image" />
          </div>
          <div className="post-container">
            <h3 className="post-title">
              <a href={ `posts/${this.props.slug}` }>{this.props.title}</a>
            </h3>
            <small>{day}</small>
            <p className="post-description">
              {this.props.summary}
            </p>
          </div>
        </article>
      </div>
    );
  }
}
