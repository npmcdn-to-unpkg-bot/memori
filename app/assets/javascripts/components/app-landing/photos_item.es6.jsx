class PhotosItem extends React.Component {
  render () {
    return (
      <div className="item col-md-4 col-sm-6">
        <div className="gallery-item" data-featherlight={this.props.img_src}>
          <img src={this.props.img_src} alt="Image" className="blog-post-image" />
          <a href={this.props.img_src} title={this.props.caption} className="gallery-item-link transition boxer">
            <div className="hex-container">
              <div className="hex">
                <div className="hex-icon"><i className="fa fa-plus"></i></div>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
