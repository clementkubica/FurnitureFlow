import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  LoadScript,
  InfoBoxF,
} from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 42.0521,
  lng: -87.6848,
};
const markers = [
  {
    id: 1,
    price: 10.0,
    position: { lat: 42.05, lng: -87.68 },
    image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
  {
    id: 2,
    price: 4.99,
    position: { lat: 42.0525, lng: -87.6825 },
    image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
  {
    id: 3,
    price: 65.75,
    position: { lat: 42.0575, lng: -87.685 },
    image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
  {
    id: 4,
    price: 28.42,
    position: { lat: 42.0575, lng: -87.68 },
    image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
  {
    id: 5,
    price: 98.35,
    position: { lat: 42.0575, lng: -87.6825 },
    image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
  {
    id: 6,
    price: 11.11,
    position: { lat: 42.0575, lng: -87.685 },
    image: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
  },
];

const createPriceMarker = (price) => {
  const svgMarker = `
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="40">
          <rect
            x="15"
            y="12.5"
            width="50"
            height="20"
            rx="6"
            ry="6"
            fill="#DAB1DA"
           
          />
          <text
            x="40"
            y="24"
            font-family="Arial"
            font-size="14"
            font-weight="bold"
            text-anchor="middle"
            fill="black"
            dominant-baseline="middle"
          >
            $${price}
          </text>
         
        </svg>
      `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarker)}`;
};

const purp = [
  {
    featureType: "road",
    stylers: [
      {
        hue: "#5e00ff",
      },
      {
        saturation: -79,
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        saturation: -78,
      },
      {
        hue: "#6600ff",
      },
      {
        lightness: 21,
      },
      {
        visibility: "on", // Enable icons for points of interest
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        hue: "#e0aaff",
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        lightness: 22,
      },
    ],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        hue: "#6600ff",
      },
      {
        saturation: -5,
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        saturation: -65,
      },
      {
        hue: "#1900ff",
      },
      {
        lightness: 8,
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        weight: 1.3,
      },
      {
        lightness: 30,
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        hue: "#5e00ff",
      },
      {
        saturation: -16,
      },
    ],
  },
  {
    featureType: "transit.line",
    stylers: [
      {
        saturation: -72,
      },
    ],
  },
];

const Map = () => {
  const [activeMarker, setActiveMarker] = useState(0 | null);
  const handleActiveMarker = (marker) => {
    console.log("activemarker changed");
    if (marker === activeMarker) {
      return undefined;
    }
    setActiveMarker(marker);
  };
  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDs962Jh1sH_fkkOtdf2FNlYyomF-4n_F8",
  });

  return isLoaded ? (
    <GoogleMap
      onLoad={handleOnLoad}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      options={{
        clickableIcons: false,
        streetViewControl: false,
        styles: purp,
      }}
    >
      {markers.map(({ id, price, position, image }) => (
        <MarkerF
          key={id}
          position={position}
          options={{ borderRadius: "100%" }}
          onClick={() => handleActiveMarker(id)}
          icon={{
            url: createPriceMarker(price),
            scaledSize: new google.maps.Size(80, 40),
            anchor: new google.maps.Point(40, 40),
          }}
        >
          {activeMarker === id ? (
            <InfoWindowF onCloseClick={() => setActiveMarker(undefined)}>
              <h1>A</h1>
            </InfoWindowF>
          ) : null}
        </MarkerF>
      ))}
    </GoogleMap>
  ) : null;
};
export default Map;
