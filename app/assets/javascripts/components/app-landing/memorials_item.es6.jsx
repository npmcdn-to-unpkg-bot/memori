class MemorialsItem extends React.Component {
  render () {
    let day = moment(this.props.dod).format('MMMM D, YYYY');
    return (
      <div className="col-md-6">
        <article className="post-content">
          <div className="row">
            <div className="col-md-6">
              <div className="featured-img">
                <img src={this.props.img_src} alt="Image" className="blog-post-image" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="post-container">
                <h3 className="post-title">
                  <a href={this.props.slug}>{this.props.name}</a>
                </h3>
                <div className="post-meta">
                  <span className="to">
                    <time dateTime={day}>
                      {day}
                    </time>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
