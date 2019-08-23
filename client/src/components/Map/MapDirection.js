import React, { Component } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

export default class MapDirection extends Component {
  state = {
    response: null,
    travelMode: 'DRIVING',
    origin: '',
    destination: '',
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

  checkBicycling = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'BICYCLING',
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

  getOrigin = ref => {
    this.origin = ref;
  };

  getDestination = ref => {
    this.destination = ref;
  };

  onClick = () => {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }));
    }
  };

  render() {
    // get bootstrap components to create interface to navigate
    return (
      <GoogleMap
        // required
        id="direction-example"
        // required
        mapContainerStyle={{
          height: '400px',
          width: '100%',
        }}
        // required
        zoom={2}
        // required
        center={{
          lat: 0,
          lng: -180,
        }}
        // optional
        onClick={this.onMapClick}
        // optional
        onLoad={map => {
          console.log('DirectionsRenderer onLoad map: ', map);
        }}
        // optional
        onUnmount={map => {
          console.log('DirectionsRenderer onUnmount map: ', map);
        }}
      >
        {this.state.destination !== '' && this.state.origin !== '' && (
          <DirectionsService
            // required
            options={{
              // eslint-disable-line react-perf/jsx-no-new-object-as-prop
              destination: this.state.destination,
              origin: this.state.origin,
              travelMode: this.state.travelMode,
            }}
            // required
            callback={this.directionsCallback}
            // optional
            onLoad={directionsService => {
              console.log(
                'DirectionsService onLoad directionsService: ',
                directionsService
              );
            }}
            // optional
            onUnmount={directionsService => {
              console.log(
                'DirectionsService onUnmount directionsService: ',
                directionsService
              );
            }}
          />
        )}

        {this.state.response !== null && (
          <DirectionsRenderer
            // required
            options={{
              // eslint-disable-line react-perf/jsx-no-new-object-as-prop
              directions: this.state.response,
            }}
            // optional
            onLoad={directionsRenderer => {
              console.log(
                'DirectionsRenderer onLoad directionsRenderer: ',
                directionsRenderer
              );
            }}
            // optional
            onUnmount={directionsRenderer => {
              console.log(
                'DirectionsRenderer onUnmount directionsRenderer: ',
                directionsRenderer
              );
            }}
          />
        )}
      </GoogleMap>
    );
  }
}
