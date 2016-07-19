class EventComments extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=1054287904657732";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render () {
    let dynamic_url = `http://www.gomemori.com/${this.props.memorial_id}/event-${this.props.event_id}`
    return (
      <div className="fb-comments" data-mobile="true" data-href={dynamic_url} data-width="100%" data-numposts="5" data-order-by="social"></div>
    );
  }
}
