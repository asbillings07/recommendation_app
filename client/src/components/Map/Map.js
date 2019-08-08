import React, { Component } from 'react';
import Marker from './Marker';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import notify from 'react-notify-toast';

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

  // ensures coordinates load before
  componentWillMount() {
    this.getCoors(this.props.location);
    this.getUserPosition();
  }
  // allows us to access the google maps API directly'
  handleApiLoaded = (map, maps) => {
    const { personCoors, recRoute } = this.state;
    // use map and maps objects
    const directionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer({
      map,
    });

    // directionsDisplay.setPanel(); - will find out how this works later
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

    if (pointA.lat && pointB.lat !== null) {
      this.calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        pointA,
        pointB,
        maps
      );
    } else {
      return 'loading...';
    }
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
        drivingOptions: {
          departureTime: new Date(Date.now() + 1),
          trafficModel: 'optimistic',
        },
      },
      (response, status) => {
        if (status === maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          notify.show(
            `Directions request failed due to ${status}`,
            'danger',
            10000
          );
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
        const userPostion = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.setState({
          personCoors: {
            lat: userPostion.lat,
            lng: userPostion.lng,
          },
        });
        return userPostion;
      });
    } else {
      console.log('geolocation is not avaiable');
    }
  };

  getCoors = address => {
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        this.setState({
          recRoute: {
            lat,
            lng,
          },
        });
        return { lat, lng };
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
      <div style={{ height: '50vh', width: '100%' }}>
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
        <div />
      </div>
    );
  }
}
export default Map;

// Geocode set up ///

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
Geocode.enableDebug();
