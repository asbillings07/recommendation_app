import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import styled from 'styled-components';
const mapStyles = {
  height: '100vh',
};

export class MapContainer extends Component {
  state = {
    zoom: 14,
    centerCoordinates: {
      lat: 33.74709,
      lng: -84.35629,
    },
    recommendationCoordinates: { lat: null, lng: null },
    personCoordinates: {
      lat: null,
      lng: null,
    },
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
  };

  componentDidMount() {
    this.getUserPosition();
    this.getLocationCoords();
  }

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.selectedRec.location !== this.props.selectedRec.location) {
      this.getLocationCoords();
    }
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
          personCoordinates: {
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
  getLocationCoords = () => {
    if (!this.props.selectedRec.location) return;

    Geocode.fromAddress(this.props.selectedRec.location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          recommendationCoordinates: {
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
      zoom,
      centerCoordinates,
      recommendationCoordinates,
      personCoordinates,
    } = this.state;

    const { selectedRec } = this.props;

    return (
      <Map
        google={this.props.google}
        zoom={zoom}
        style={mapStyles}
        initialCenter={centerCoordinates}
        center={recommendationCoordinates}
      >
        <Marker
          name="Your Location"
          title="Your Location"
          position={personCoordinates}
        />
        <Marker
          onClick={this.onMarkerClick}
          name={selectedRec.title}
          title={selectedRec.title}
          position={recommendationCoordinates}
        />

        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={this.onClose}
        >
          <Container>
            <h3>{selectedRec.title}</h3>
            <h6>{selectedRec.description}</h6>
            <button href="#">{selectedRec.location}</button>
          </Container>
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

const Container = styled.div`
  align-items: center;
`;

// const StyledMap = styled(Map)`
//   @media (max-width: 768px) {
//     flex-direction: column;
//     width: 100vw;
//   }
// `;
