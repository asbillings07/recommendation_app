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
    personCoors: {
      lat: null,
      lng: null,
    },
    zoom: 12,
  };

  createMapOptions = maps => {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL,
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: true,
      DirectionsTravelMode: maps.DirectionsTravelMode,
      DirectionsStatus: maps.DirectionsStatus,
    };
  };

  getUserPosition = () => {
    if ('geolocation' in navigator) {
      console.log('Geolocation is available');
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log(lat, lng);
        this.setState({
          personCoors: {
            lat,
            lng,
          },
        });
      });
    } else {
      console.log('geolocation is not avaiable');
    }
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
    const { center, zoom, personCoors } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAPS_API_KEY}` }}
          center={center}
          defaultZoom={zoom}
          onClick={() => this.getCoors(this.props.location)}
          options={this.createMapOptions}
        >
          <Marker
            lat={center.lat}
            lng={center.lng}
            color={'black'}
            text="My Marker"
          />
          <Marker
            color={'green'}
            lat={personCoors.lat}
            lng={personCoors.lng}
            text="Your location"
          />
        </GoogleMapReact>
        {console.log(this.getUserPosition())}
      </div>
    );
  }
}
export default Map;

// Geocode set up ///

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
Geocode.enableDebug();
