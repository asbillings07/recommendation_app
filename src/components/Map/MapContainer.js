/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import Geocode from 'react-geocode'
import { useGeolocation } from '../../CustomHooks'
import styled from 'styled-components'
const mapStyles = {
  height: '100vh'
}

export function MapContainer({ selectedRec, google }) {
  const [isLoading, isResolved, isRejected, position, error] = useGeolocation()

  const [state, setState] = useState({
    zoom: 14,
    centerCoordinates: {
      lat: 33.74709,
      lng: -84.35629
    },
    recommendationCoordinates: { lat: null, lng: null },
    personCoordinates: {
      lat: null,
      lng: null
    },
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
  })
  useEffect(() => {
    getUserPosition()
  }, [isResolved])

  useEffect(() => {
    getLocationCoords()
  }, [selectedRec])

  // gets the current user position throught the browser
  const getUserPosition = () => {
    if (isLoading) console.log('getting or updating location...')
    if (isRejected) console.log('geolocation is unavilable at this time')
    if (error) console.error('Location Error', error)
    if (isResolved) {
      console.log('GEO Position!!', position)
      const userPostion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      setState((state) => ({
        ...state,
        personCoordinates: {
          lat: userPostion.lat,
          lng: userPostion.lng
        }
      }))

      return userPostion
    }
  }

  // gets coords from location
  const getLocationCoords = () => {
    if (!selectedRec.location) {
      console.log(selectedRec)
      return
    }

    Geocode.fromAddress(selectedRec.location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        setState((state) => ({
          ...state,
          recommendationCoordinates: {
            lat,
            lng
          }
        }))
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  // when marker on map is clicked
  const onMarkerClick = (props, marker, e) => {
    console.log('MARKER Props', props)
    setState((state) => ({
      ...state,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    }))
  }
  // when infoWindow close button is pressed
  const onClose = (props) => {
    if (showingInfoWindow) {
      setState((state) => ({
        ...state,
        showingInfoWindow: false,
        activeMarker: null
      }))
    }
  }

  const {
    activeMarker,
    showingInfoWindow,
    zoom,
    centerCoordinates,
    recommendationCoordinates,
    personCoordinates
  } = state

  return (
    <Map
      google={google}
      zoom={zoom}
      style={mapStyles}
      initialCenter={centerCoordinates}
      center={recommendationCoordinates}
    >
      <Marker name='Your Location' title='Your Location' position={personCoordinates} />
      <Marker
        onClick={onMarkerClick}
        name={selectedRec.title}
        title={selectedRec.title}
        position={recommendationCoordinates}
      />

      <InfoWindow marker={activeMarker} visible={showingInfoWindow} onClose={onClose}>
        <Container>
          <h3>{selectedRec.title}</h3>
          <h6>{selectedRec.description}</h6>
          <button href='#'>{selectedRec.location}</button>
        </Container>
      </InfoWindow>
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_MAPS_API_KEY}`
})(MapContainer)

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.enableDebug()

const Container = styled.div`
  align-items: center;
`

// const StyledMap = styled(Map)`
//   @media (max-width: 768px) {
//     flex-direction: column;
//     width: 100vw;
//   }
// `;
