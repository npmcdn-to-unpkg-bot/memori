class ServiceBox extends React.Component {
  constructor() {
    super();

    this.state = {
      services: [
        {icon: "fa fa-users", title: "Memorials", content: "              Easily setup the memorial page and include a biography about the person. Pour your heart out, there is no word limit.", id: 1},
        {icon: "fa fa-picture-o", title: "Photos", content: "                          Scan in photos from albums and gather photos from various Internet sources. Visitors can even submit their own photos.", id: 2},
        {icon: "fa fa-calendar-o", title: "Events", content: "                          Create a timeline of the most important events in your loved ones' life. Visitors can reminisce and submit their own events.", id: 3},
        {icon: "fa fa-pencil-square-o", title: "Guest Book", content: "Have a guest book so any visitor can leave a personal message about the deceased.", id: 4}
      ]
    };
  }
  render () {
    let serviceItems = this.state.services.map((service) => {
      return (
        <div className="col-md-3 col-sm-6" key={service.id}>
          <div className="service-item">
            <div className="hex">
              <div className="hex-icon"><i className={service.icon} ></i></div>
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-txt">
              {service.content}
            </p>
          </div>
        </div>
      )
    });
    return (
      <div>
        {serviceItems}
      </div>
    );
  }
}
