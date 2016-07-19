class BlogPagination extends React.Component {
  render () {
    return (
        <div className="BlogPagination">
          <a onClick={this.props.onPaginationSubmit} className="btn md-btn">Load More</a>
        </div>
    );
  }
}
