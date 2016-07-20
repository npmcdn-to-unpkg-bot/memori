class PhotoGallery extends React.Component {
  static propTypes = {
    memorial_id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  };

  state = {
    photos: []
  };

  constructor(props) {
    super(props);
  }

  loadPhotos() {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: `/api/v1/memorial_photos.json?id=${this.props.memorial_id}`,
      success: (data) => {
        this.setState({ photos: data });
        console.log(this.state);
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  }

  handlePhotoSubmit = (photo) => {
    $.ajax({
      type: "POST",
      dataType: 'json',
      url: "/api/v1/" + this.props.url,
      data: photo,
      success: (data) => {
        this.setState({ photos: data })
      }.bind(this)
    });
  }

  handlePagination = () => {
    this.loadPhotos();
  }

  componentDidMount() {
    this.loadPhotos();
  }

  componentDidUpdate() {
  }

  renderPhotos = (photo) => {
    return <PhotoItem
                 key={photo.id}
                 photo_id={photo.id}
                 memorial_id={this.props.memorial_id}
                 caption={photo.caption}
                 picture={photo.picture.gallery.url} />
  }

  render () {
    return (
      <div className="PhotoGallery pattern">
        <header className="section-header" style={{textAlign:'center'}}>
          <h3 className="section-title">Photo Gallery</h3>
          <a href="#photo-form" rel="modal:open" className="button">Submit Photo</a>
          <br />
          <br />
          <PhotoForm onPhotoSubmit={this.handlePhotoSubmit} />
        </header>
        <div id="gallery-wrapper">
          {this.state.photos.map(this.renderPhotos)}
        </div>
      </div>
    );
  }
}
