import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '50vh',
};

export class MapContainer extends Component {
  state = {
    zoom: 14,
    center: {
      lat: 33.74709,
      lng: -84.35629,
    },
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.state.zoom}
        style={mapStyles}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_MAPS_API_KEY}`,
})(MapContainer);
