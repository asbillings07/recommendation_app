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
    recRoute: {
      lat: null,
      lng: null,
    },
    zoom: 12,
  };

  // allows us to access the google maps API directly

  handleApiLoaded = (map, maps) => {
    const { personCoors, recRoute } = this.state;
    // gets the location of the recommendation from props
    this.getCoors(this.props.location);
    // gets the user location from the browser
    this.getUserPosition();
    // use map and maps objects
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer({
      map,
    });
    const pointA = {
      lat: personCoors.lat,
      lng: personCoors.lng,
    };
    console.log(pointA);
    const pointB = {
      lat: recRoute.lat,
      lng: recRoute.lng,
    };
    console.log(pointB);

    this.calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      pointA,
      pointB,
      maps
    );
  };

  // calulates and displays the route for google maps.
  calculateAndDisplayRoute(
    directionsService,
    directionsDisplay,
    pointA,
    pointB,
    maps
  ) {
    directionsService.route(
      {
        origin: pointA,
        destination: pointB,
        travelMode: maps.TravelMode.DRIVING,
      },
      function(response, status) {
        if (status === maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

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
    };
  };

  getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

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
          recRoute: {
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
    const { center, zoom, personCoors, recRoute } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAPS_API_KEY}` }}
          center={center}
          defaultZoom={zoom}
          options={this.createMapOptions}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          <Marker
            lat={recRoute.lat}
            lng={recRoute.lng}
            color={'black'}
            text="Other Location"
          />
          <Marker
            color={'green'}
            lat={personCoors.lat}
            lng={personCoors.lng}
            text="Your location"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;

// Geocode set up ///

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
Geocode.enableDebug();
