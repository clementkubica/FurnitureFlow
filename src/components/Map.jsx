import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: 'auto',
  height: '100vh',
}
const center = {
  lat: 42.0521,
  lng: -87.6848,
}
const zoom = 17

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDs962Jh1sH_fkkOtdf2FNlYyomF-4n_F8',
      })
    
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
      return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ disableDefaultUI: true }}>
          <></>
        </GoogleMap>
      ) : (
        <></>
      )
}

export default React.memo(Map)
