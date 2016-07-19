class BlogListing extends React.Component {
  render () {
    let blogItems = this.props.posts.map((post) => {
      return <BlogItem
                key={post.id}
                slug={post.slug}
                img_src={post.picture.url}
                summary={post.summary}
                created={post.created_at}
                title={post.title} />
            });

    return (
      <div>
        {blogItems}
      </div>
    );
  }
}
