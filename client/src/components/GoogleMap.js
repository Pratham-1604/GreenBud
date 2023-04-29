import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [directions, setDirections] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const handleMarkerDrag = (index, event) => {
    const newMarkers = [...markers];
    newMarkers[index].lat = event.lat;
    newMarkers[index].lng = event.lng;
    setMarkers(newMarkers);
    calculateDirections();
  };

  const handleMapClick = (event) => {
    const newMarkers = [...markers];
    newMarkers.push({
      lat: event.lat,
      lng: event.lng,
    });
    setMarkers(newMarkers);
    calculateDirections();
  };

  const calculateDirections = () => {
    if (markers.length >= 2) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = new window.google.maps.LatLng(
        markers[0].lat,
        markers[0].lng
      );
      const destination = new window.google.maps.LatLng(
        markers[1].lat,
        markers[1].lng
      );
      const waypoints = markers.slice(2).map((marker) => ({
        location: new window.google.maps.LatLng(marker.lat, marker.lng),
        stopover: false,
      }));
      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result.routes[0].overview_path);
          }
        }
      );
    } else {
      setDirections([]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDYKrqo4uZx9j0S9D0PeH8fBxarOTswUNg" }}
        defaultCenter={defaultCenter}
        defaultZoom={14}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            lat={marker.lat}
            lng={marker.lng}
            onDrag={(event) => handleMarkerDrag(index, event)}
          />
        ))}
        {directions.length > 0 && (
          <Polyline
            path={directions}
            options={{ strokeColor: "#FF0000", strokeWeight: 4 }}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ onDrag, ...props }) => (
  <div
    style={{
      position: "absolute",
      top: "-20px",
      left: "-20px",
      width: "40px",
      height: "40px",
      border: "2px solid #FF0000",
      borderRadius: "50%",
      backgroundColor: "#FFFFFF",
      textAlign: "center",
      cursor: "pointer",
    }}
    {...props}
    draggable={true}
    onDragEnd={onDrag}
  >
    <div style={{ marginTop: "12px" }}>📍</div>
  </div>
);
const Polyline = ({ path, options }) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
    <GoogleMapReact.OverlayView
      bounds={getBounds(path)}
      mapPaneName={GoogleMapReact.OVERLAY_MOUSE_TARGET}
    >
      <div>
        <GoogleMapReact.Polyline path={path} options={options} />
      </div>
    </GoogleMapReact.OverlayView>
  </div>
);
const getBounds = (path) => {
  const bounds = new window.google.maps.LatLngBounds();
  path.forEach((location) =>
    bounds.extend(new window.google.maps.LatLng(location.lat, location.lng))
  );
  return bounds;
};

export default Map;
