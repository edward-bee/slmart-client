import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 8.4928,
    longitude: -13.2351,
    zoom: 8,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  // console.log(`Mapbox Token: ${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`)
  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/edward-bee/clf9m09th003w01mu56gucxgv"
      >
        {/* Markers */}
        <Marker latitude={37.78} longitude={-122.41}>
          <button
            className="marker-btn"
            onClick={(event) => {
              event.preventDefault();
              setSelectedMarker("Marker 1");
            }}
          >
            <FiShoppingCart />
            {/* <img src="/marker.png" alt="Marker" /> */}
          </button>
        </Marker>

        <Marker latitude={37.75} longitude={-122.43}>
          <button
            className="marker-btn"
            onClick={(event) => {
              event.preventDefault();
              setSelectedMarker("Marker 2");
            }}
          >
            <FiShoppingCart />

            {/* <img src="/marker.png" alt="Marker" /> */}
          </button>
        </Marker>

        {/* Popups */}
        {selectedMarker && (
          <Popup
            latitude={37.78}
            longitude={-122.41}
            onClose={() => {
              setSelectedMarker(null);
            }}
          >
            <div>{selectedMarker}</div>
          </Popup>
        )}

        {selectedMarker && (
          <Popup
            latitude={37.75}
            longitude={-122.43}
            onClose={() => {
              setSelectedMarker(null);
            }}
          >
            <div>{selectedMarker}</div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;
