class GuestbookListing extends React.Component {
  render () {
    let guestbookItems = this.props.comments.map((comment) => {
      return <GuestbookItem
                key={comment.id}
                created={comment.created_at}
                author={comment.author}
                body={comment.body} />
            });

    return (
      <div className="GuestbookListing">
        {guestbookItems}
      </div>
    );
  }
}
