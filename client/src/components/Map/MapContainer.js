import React, { Component } from 'react';
import Spinner from '../Spinner';
import Map from './Map';
import env from '../../env';
import { GoogleApiComponent } from 'google-map-react';

export class MapContainer extends Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh',
    };
    // if loading show spinner, else show map
    if (!this.props.loaded) {
      return <Spinner size="4x" spinning="spinning" />;
    }
    // returning google map with props
    return (
      <div style={style}>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: env.mapsApiKey,
})(MapContainer);
