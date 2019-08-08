import React, { Component } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export default class GMap extends Component {
  state = {
    zoom: 15,
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
    response: null,
    travelMode: 'DRIVING',
  };

  directionsCallback = response => {
    console.log(response);

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(() => ({
          response,
        }));
      } else {
        console.log('response: ', response);
      }
    }
  };

  checkDriving = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'DRIVING',
      }));
  };

  checkTransit = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'TRANSIT',
      }));
  };

  checkWalking = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'WALKING',
      }));
  };

  componentDidMount() {
    this.getUserPosition();
    this.getCoors(this.props.location);
  }

  // gets user position
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

  // gets coords of the location passed in
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
    const { zoom, center, personCoors, recRoute } = this.state;
    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={`${process.env.REACT_APP_MAPS_API_KEY}`}

        // {...other props}
      >
        <GoogleMap
          id="example-map"
          mapContainerStyle={{
            height: '50vh',
            width: '100%',
          }}
          zoom={zoom}
          center={recRoute} //   {...other props }
        >
          <FloatingCard>
            <Card.Title>This is a Title</Card.Title>
          </FloatingCard>
          <Marker
            onLoad={marker => {
              console.log('marker: ', marker);
            }}
            position={center}
          />
          <Marker
            onLoad={marker => {
              console.log('marker: ', marker);
            }}
            position={recRoute}
          />
          ...Your map components
        </GoogleMap>
      </LoadScript>
    );
  }
}

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
Geocode.enableDebug();

const FloatingCard = styled(Card)`
  position: absolute;
  width: 5rem;
  top: 26%;
  left: 1%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: 'Roboto', 'sans-serif';
  line-height: 30px;
  padding-left: 10px;
`;
