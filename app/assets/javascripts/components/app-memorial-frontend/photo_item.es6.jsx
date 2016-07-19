class PhotoItem extends React.Component {
  render () {
    return (
        <div className="PhotoItem">
          <div className="block" data-featherlight={this.props.picture}>
            <div className="image-holder">
              <img src={this.props.picture} />
            </div>
            <a href={this.props.picture} className="portfolio-hover">
              <div className="portfolio-info">
                <h3 className="portfolio-title">
                  {this.props.caption}
                </h3>
              </div>
            </a>
          </div>
        </div>
    );
  }
}
