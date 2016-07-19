class GuestbookPagination extends React.Component {
  render () {
    return (
        <div className="GuestbookPagination">
          <a onClick={this.props.onPaginationSubmit} className="button">Load More</a>
        </div>
    );
  }
}
