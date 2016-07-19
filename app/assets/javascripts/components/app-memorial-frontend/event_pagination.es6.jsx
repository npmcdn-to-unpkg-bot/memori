class EventPagination extends React.Component {
  render () {
    return (
        <div className="EventPagination">
          <a onClick={this.props.onPaginationSubmit} className="button">Load More</a>
        </div>
    );
  }
}
