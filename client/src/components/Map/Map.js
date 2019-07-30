import React, { Component } from 'react';
import Marker from './Marker';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';

class Map extends Component {
  state = {
    center: {
      lat: 33.74709,
      lng: -84.35629,
    },
    zoom: 11,
  };

  getCoors = address => {
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({
          center: {
            lat,
            lng,
          },
        });
      },
      error => {
        console.error(error.message);
      }
    );
  };

  render() {
    const { center, zoom } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAPS_API_KEY}` }}
          center={center}
          defaultZoom={zoom}
          onClick={() => this.getCoors(this.props.location)}
        >
          <Marker lat={center.lat} lng={center.lng} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;

// Geocode set up ///

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
Geocode.enableDebug();
