import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
const mapStyles = {
  width: '50vw',
  height: '100vh',
};

export class MapContainer extends Component {
  state = {
    zoom: 14,
    center: {
      lat: 33.74709,
      lng: -84.35629,
    },
    personCoors: {
      lat: null,
      lng: null,
    },
    recRoute: {},
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
  };

  componentDidMount() {
    this.getUserPosition();
  }

  // gets the current user postion throught the browser
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

  // gets coords from location
  getLocationCoords = ([address]) => {
    //Need to get muliple locations from this...
    Geocode.fromAddress(...address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng };
      },
      error => {
        console.error(error.message);
      }
    );
  };

  // when marker on map is clicked
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  // when infoWindow close button is pressed
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const {
      activeMarker,
      showingInfoWindow,
      selectedPlace,
      zoom,
      center,
      personCoors,
      recRoute,
    } = this.state;

    const { title, locations, description } = this.props;

    return (
      <Map
        google={this.props.google}
        zoom={zoom}
        style={mapStyles}
        initialCenter={center}
        center={recRoute}
      >
        {this.props.recs.map(rec => (
          <Marker
            key={rec.id}
            onClick={this.onMarkerClick}
            name={rec.title}
            title={rec.title}
            position={this.getLocationCoords(rec.location)}
          />
        ))}
        <Marker
          onClick={this.onMarkerClick}
          name={'Your Location'}
          position={personCoors}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={title[0]}
          title={title[0]}
          position={this.getLocationCoords(locations[0])}
        />

        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{title[0]}</h4>
            <h6>{description[0]}</h6>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_MAPS_API_KEY}`,
})(MapContainer);

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
Geocode.enableDebug();
