class AboutBox extends React.Component {
  render () {
    return (
      <div>
        <div className="col-md-6">
          <h3 className="section-title">About Us</h3>
          <p className="description">
            <strong>Our goal is to allow everyone to create memorials for their loved ones.</strong>
            We want to create a platform for people to share stories, photos and memories about the person they losts.
            A place that looks beautiful and can be easily accessed by anyone.
          </p>
        </div>
        <div className="col-md-6">
          <img src={this.props.img_src} alt="Image" />
        </div>
      </div>
    );
  }
}

AboutBox.propTypes = {
  img_src: React.PropTypes.string
};
