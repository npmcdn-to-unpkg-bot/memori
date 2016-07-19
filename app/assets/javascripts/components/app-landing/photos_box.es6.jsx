class PhotosBox extends React.Component {
  constructor() {
    super();

    this.state = {
      photos: []
    };

  }

  showPhotos(response) {
    this.setState({
      photos: response
    })
  }

  getPhotos(URL) {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: URL,
      success: (response) => {
        this.showPhotos(response);
      }.bind(this)
    });
  }

  componentDidMount() {
    this.getPhotos('/api/v1/home_photos.json');
  }

  render () {
    return (
      <div>
        <h3 className="section-title">Recent Photos</h3>
        <PhotosListing photos={this.state.photos} />
      </div>
    );
  }
}
