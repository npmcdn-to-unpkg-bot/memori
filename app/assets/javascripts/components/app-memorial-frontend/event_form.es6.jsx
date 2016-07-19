class EventForm extends React.Component {
  static propTypes = {
    onEventSubmit: React.PropTypes.func.isRequired,
  };

  state = {
    date: '',
    title: '',
    description: '',
    picture: ''
  };

  handleDateChange = (e) => {
    this.setState({ date: e.target.value });
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
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
    let date = this.state.date.trim();
    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let picture = this.state.picture;

    console.log(this.state);

    if (!date || !title || !description) {
      return;
    }

    this.props.onEventSubmit({
      event: { date: date, title: title, description: description, picture: picture }
    });

    toastr.success("Thank you. The memorial creator will review your event submission.")

    this.setState({ date: '', title: '', description: '', picture: '' });

  }

  render () {
    return (
      <div id="event-form" style={{display:'none'}}>
      <h4>Suggest and Event</h4>
    <form onSubmit={this.handleSubmit} className="actionform">

        <div className="control-group">
          <input type="date" value={this.state.date} onChange={this.handleDateChange} required />
        </div>
        <br />

        <div className="control-group">
          <input type="text" placeholder="Event Title" value={this.state.title} onChange={this.handleTitleChange} required />
        </div>
        <br />

        <div className="control-group">
          <textarea rows="5" placeholder="Event Description" value={this.state.description} onChange={this.handleDescriptionChange} required></textarea>
        </div>
        <br />

        <div className="control-group">
          <input type="file" onChange={this.handlePictureChange} />
        </div>
        <br />

        <div className="clearfix"></div>
        <input type="submit" className="color" value="Submit Event" />

        <div className="clearfix"></div>
      </form>
      </div>
    );
  }
}
