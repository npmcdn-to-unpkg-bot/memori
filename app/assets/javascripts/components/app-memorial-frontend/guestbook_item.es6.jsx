class GuestbookItem extends React.Component {
  render () {
    let day = moment(this.props.created).format('MMMM D, YYYY');
    return (
        <div className="column twelve">
          <div className="column three"><span style={{opacity:0}}>Space</span></div>
          <div className="column six">
            <div className="box pattern">
              <span className="date">{day}</span>
              <div className="guest">
                <p>{this.props.body}</p>
                <span className="name">{this.props.author}</span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
