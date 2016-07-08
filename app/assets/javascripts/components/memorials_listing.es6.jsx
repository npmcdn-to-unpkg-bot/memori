class MemorialsListing extends React.Component {
  render () {
    let memorialItems = this.props.memorials.map((memorial) => {
      return <MemorialsItem
                key={memorial.id}
                dod={memorial.dod}
                img_src={memorial.picture.url}
                slug={memorial.slug}
                name={memorial.name} />
            });

    return (
      <div>
        {memorialItems}
      </div>
    );
  }
}
