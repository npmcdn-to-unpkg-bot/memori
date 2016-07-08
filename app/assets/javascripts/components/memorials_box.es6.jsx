class MemorialsBox extends React.Component {
  constructor() {
    super();

    this.state = {
      memorials: []
    };

  }

  showMemorials(response) {
    this.setState({
      memorials: response
    })
  }

  getMemorials(URL) {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: URL,
      success: (response) => {
        this.showMemorials(response);
      }.bind(this)
    });
  }

  componentDidMount() {
    this.getMemorials('/api/v1/home_memorials.json');
  }

  render () {
    return (
      <div>
        <MemorialsListing memorials={this.state.memorials} />
      </div>
    );
  }
}
