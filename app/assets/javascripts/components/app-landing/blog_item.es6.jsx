class BlogItem extends React.Component {
  render () {
    let day = moment(this.props.created).format('MMMM D, YYYY');
    return (
      <div className="about-right-box">
        <article className="post-content">
          <div className="row">
            <div className="col-sm-6">
              <div className="featured-img">
                <img src={this.props.img_src} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="post-container">
                <h3 className="post-title">
                  <a href={ `posts/${this.props.slug}` }>{this.props.title}</a>
                </h3>
                <div className="post-meta">
                  <span className="time">
                    {day}
                  </span>
                </div>
                <p className="post-description">
                  {this.props.summary}
                </p>
                <div className="continue-reading pull-left">
                  <a href={ `posts/${this.props.slug}` }>Read More</a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
