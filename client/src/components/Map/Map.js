import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

import env from '../../env';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const MyGreatPlaceWithHover = ({ text, ...greatPlaceCoords }) => (
  <div>{text}</div>
);
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 33.74709,
      lng: -84.35629,
    },
    zoom: 11,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 },
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: env.mapsApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={33.74709} lng={-84.35629} text="My Marker" />
          <MyGreatPlaceWithHover lat={59.955413} lng={30.337844} text="A" />
          <MyGreatPlaceWithHover {...this.props.greatPlaceCoords} text="B" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
