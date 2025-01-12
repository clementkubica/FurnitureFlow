import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  LoadScript,
  InfoBoxF,
} from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import axios from 'axios';


const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 42.0521,
  lng: -87.6848,
};
const markers = [
  {
      id: 1,
      name: 'A',
      position: { lat: 42.0500, lng: -87.6800 },
      image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
  {
    id:2,
    name: 'B',
    position: { lat: 42.0525, lng: -87.6825 },
    image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
},
{
  id: 3,
  name: 'C',
  position: { lat: 42.0575, lng: -87.6850 },
  image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",

},
{
  id: 4,
  name: 'D',
  position: { lat: 42.0575, lng: -87.6800 },
  image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",

},
{
id:5,
name: 'E',
position: { lat: 42.0575, lng: -87.6825 },
image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",

},
{
id: 6,
name: 'F',
position: { lat: 42.0575, lng: -87.6850 },
image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",

},
];

function fetchItems(bounds) {
    const minLat = bounds.south
    const maxLat = bounds.north
    const minLon = bounds.west
    const maxLon = bounds.east

    axios.post("https://fetchitems-jbhycjd2za-uc.a.run.app", {
        "minLat": minLat,
        "maxLat": maxLat,
        "minLon": minLon,
        "maxLon": maxLon,
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((res) => {
        console.log("res:", res)
    })
    .catch((error) => {
        console.error(error.response.data)
    })
}

const Map = () => {
    const [activeMarker, setActiveMarker] = useState(0 | null);
    const [gMap, setGMap] = useState(null)
    const [mapBounds, setMapBounds] = useState(null)

    function updateBounds(newBounds) {
        setMapBounds({
            north: newBounds.getNorthEast().lat(),
            east: newBounds.getNorthEast().lng(),
            south: newBounds.getSouthWest().lat(),
            west: newBounds.getSouthWest().lng(),
        });
    }

    const handleActiveMarker = (marker) => { 
        console.log('activemarker changed');
        if (marker === activeMarker) {
            return undefined;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
        updateBounds(bounds)
        setGMap(map)
    };

    const handleZoomChange = () => {
        if (gMap) {
            updateBounds(gMap.getBounds())
        }
    }

    const handleDragEnd = () => {
        if (gMap) {
            updateBounds(gMap.getBounds())
        }
    }

    useEffect(() => {
        if (mapBounds) {
            fetchItems(mapBounds)
        }
    }, [mapBounds])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDs962Jh1sH_fkkOtdf2FNlYyomF-4n_F8",
    });

    return isLoaded ? (
        <GoogleMap
            onLoad={handleOnLoad}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onDragEnd={handleDragEnd}
            onZoomChanged={handleZoomChange}
        >
            {markers.map(({ id, name, position, image }) => (
                <MarkerF key={id} position={position} icon={{url:image, scaledSize: new google.maps.Size(65, 65)}} options={{borderRadius:"100%"}} onClick={() => handleActiveMarker(id)}> // Adjust these numbers to change size
                    {activeMarker === id ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(undefined)}>
                            <div key={id}>{name}</div>
                        </InfoWindowF>
                    ) : null}
                </MarkerF>
            ))}
        </GoogleMap>
    ) : null;
};
export default Map;