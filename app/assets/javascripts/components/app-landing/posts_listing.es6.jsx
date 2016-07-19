class PostsListing extends React.Component {
  render () {
    let postItems = this.props.posts.map((post) => {
      return <PostsItem
                key={post.id}
                slug={post.slug}
                img_src={post.picture.url}
                summary={post.summary}
                created={post.created_at}
                title={post.title} />
            });

    return (
      <div>
        {postItems}
      </div>
    );
  }
}
