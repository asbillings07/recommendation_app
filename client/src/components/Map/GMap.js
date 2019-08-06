import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default class GMap extends Component {
  state = {};

  render() {
    return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey={`${process.env.REACT_APP_MAPS_API_KEY}`}
        // {...other props}
      >
        <GoogleMap
          id="example-map"
          //   {...other props }
        >
          ...Your map components
        </GoogleMap>
      </LoadScript>
    );
  }
}
