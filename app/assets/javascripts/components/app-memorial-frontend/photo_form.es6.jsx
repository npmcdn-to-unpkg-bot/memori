class PhotoForm extends React.Component {
  state = {
    caption: '',
    picture: ''
  }

  handleCaptionChange = (e) => {
    this.setState({ caption: e.target.value });
  }

  handlePictureChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = function(upload) {
      this.setState({ picture: upload.target.result });
    }.bind(this);

    reader.readAsDataURL(file);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let caption = this.state.caption.trim();
    let picture = this.state.picture;

    console.log(this.state);

    if (!caption || !picture) {
      return;
    }

    this.props.onPhotoSubmit({
      photo: { caption: caption, picture: picture }
    });

    toastr.success("Thank you. The memorial creator will review your photo submission.")

    this.setState({ caption: '', picture: '' });
  }

  render () {
    return (
      <div id="photo-form" style={{display:'none'}}>
        <h4>Suggest and Event</h4>
        <form onSubmit={this.handleSubmit} className="actionform">

          <div className="control-group">
            <input type="text" placeholder="Photo Caption" value={this.state.caption} onChange={this.handleCaptionChange} required />
          </div>
          <br />

          <div className="control-group">
            <input type="file" onChange={this.handlePictureChange} />
          </div>
          <br />

          <div className="clearfix"></div>
          <input type="submit" className="color" value="Submit Photo" />

          <div className="clearfix"></div>
        </form>
      </div>
    );
  }
}
