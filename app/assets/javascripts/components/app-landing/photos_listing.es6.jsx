class PhotosListing extends React.Component {
  render () {
    let photoItems = this.props.photos.map((photo) => {
      return <PhotosItem
                key={photo.id}
                img_src={photo.picture.home.url}
                caption={photo.caption} />
            });

    return (
      <div>
        {photoItems}
      </div>
    );
  }
}
