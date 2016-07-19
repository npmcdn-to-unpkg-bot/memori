class GuestbookBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      page_number: this.props.page_number,
      total_pages: this.props.total_pages
    };
  }

  loadComments() {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: `/api/v1/guestbook_comments.json?id=${this.props.memorial_id}&guestbook_page=${this.state.page_number}`,
      success: (data) => {
        data.map((comment) => { this.state.comments.push(comment) });
        this.setState({ page_number: this.state.page_number + 1 })
      }.bind(this),
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  }

  handleCommentSubmit(comment) {
    let comments = this.state.comments;
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({ comments: newComments });

    $.ajax({
      type: "POST",
      dataType: 'json',
      url: "/api/v1/" + this.props.url,
      data: comment,
      success: (data) => {
        this.setState({ comments: data })
      }.bind(this)
    });
  }

  handlePagination() {
    this.loadComments();
  }

  componentDidMount() {
    this.loadComments();
  }

  render () {
    return (
      <div className="GuestbookBox">
        <section id="guestbook">
          <header className="section-header">
            <h3 className="section-title">Guestbook</h3>
            <p className="section-tagline">Please share any stories or memories of the deceased.</p>
          </header>
          <div className="container timeline">
            <span className="arrow-up"></span>
            <span className="arrow-down"></span>
            <div className="row">
              <div className="timeline-year start"><span>ENTRIES</span></div>
              <GuestbookListing comments={this.state.comments} />
            </div>
            <div className="clearfix"></div>
            <div className="timeline-button">
              { this.state.page_number <= this.state.total_pages ? (
                <GuestbookPagination onPaginationSubmit={this.handlePagination.bind(this)} />
              ) : '' }
            </div>
          </div>
            <br /><br />
            <GuestbookForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
        </section>
      </div>
    );
  }
}
