class EventBox extends React.Component {
  static propTypes = {
    memorial_id: React.PropTypes.string.isRequired,
    page_number: React.PropTypes.number.isRequired,
    total_pages: React.PropTypes.number.isRequired
  };

  state = {
    events: [],
    page_number: this.props.page_number,
    total_pages: this.props.total_pages
  };

  constructor(props) {
    super(props);
  };

  loadEvents() {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: `/api/v1/memorial_events.json?id=${this.props.memorial_id}&event_page=${this.state.page_number}`,
      success: (data) => {
        data.map((event) => { this.state.events.push(event) });
        this.setState({ page_number: this.state.page_number + 1 });
        console.log(this.state);
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  }

  handleEventSubmit = (event) => {
    $.ajax({
      type: "POST",
      dataType: 'json',
      url: "/api/v1/" + this.props.url,
      data: event,
      success: (data) => {
        this.setState({ events: data })
      }.bind(this)
    });
  }

  handlePagination = () => {
    this.loadEvents();
  }

  componentDidMount() {
    this.loadEvents();
  }

  renderEvents = (event) => {
    return <EventItem
              key={event.id}
              event_id={event.id}
              memorial_id={this.props.memorial_id}
              date={event.date}
              title={event.title}
              description={event.description}
              picture={event.picture.url} />
  }

  render () {
    return (
      <div className="EventBox">
        <header className="section-header">
          <h3 className="section-title">TIMELINE</h3>
          <p className="section-tagline">Here is a collection of the most cherished memories.</p>
        </header>
        <div className="container timeline">
          <span className="arrow-up"></span>
          <span className="arrow-down"></span>
          <div className="row">
            <div className="timeline-year start"><span>EVENTS</span></div>
            {this.state.events.map(this.renderEvents)}
          </div>
          <div className="clearfix"></div>
          <div className="timeline-button">
            { this.state.page_number <= this.state.total_pages ? (
              <EventPagination onPaginationSubmit={this.handlePagination} />
            ) : '' }
            <br /><br />
          <a href="#event-form" rel="modal:open" className="button">Suggest Event</a>
          <EventForm onEventSubmit={this.handleEventSubmit} />
          </div>
        </div>
      </div>
    );
  }
}
