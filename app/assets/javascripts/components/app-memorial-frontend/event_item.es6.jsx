class EventItem extends React.Component {
  render () {
    let day = moment(this.props.date).format('MMMM D, YYYY');
    return (
        <div className="column twelve">
          <div className="column two"><span style={{opacity:0}}>Space</span></div>
          <div className="column eight">
            <div className="box pattern">
              <span className="date">{day}</span>
              <h2>{this.props.title}</h2>
              <div className="box-content">
                <div className="block">
                  <div className="image-holder">
                   <img src={this.props.picture} />
                  </div>
                </div>
                <p>{this.props.description}</p>
                <br />
              <EventComments event_id={this.props.event_id} memorial_id={this.props.memorial_id} />
              </div>
            </div>
          </div>
        </div>
    );
  }
}
