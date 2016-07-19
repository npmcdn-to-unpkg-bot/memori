class GuestbookForm extends React.Component {
  constructor() {
    super();

    this.state = {
      author: '',
      body: ''
    };
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let body = this.state.body.trim();

    if (!author || !body) {
      return;
    }

    this.props.onCommentSubmit({
      comment: { author: author, body: body }
    });

    toastr.success("Thank you for the entry.")

    this.setState({ author: '', body: '' });
  }

  render () {
    let action = `/api/v1/${this.props.url}`;
    return (
      <div className="form color GuestbookForm">
          <header className="section-header">
              <h3>Write Something</h3>
          </header>
          <div className="container smaller">
            <div className="row">
            <form onSubmit={this.handleSubmit.bind(this)} className="actionform">
              <div className="control-group">
                <input type="text" placeholder="Your Name" value={this.state.author} onChange={this.handleAuthorChange.bind(this)} required />
              </div>
              <div className="control-group">
                <textarea rows="5" placeholder="Your Entry" value={this.state.body} onChange={this.handleBodyChange.bind(this)} required></textarea>
              </div>
              <div className="clearfix"></div>
              <input type="submit" className="color" value="Leave Entry" />
              <div className="clearfix"></div>
            </form>
            </div>
          </div>
        </div>
    );
  }
}
