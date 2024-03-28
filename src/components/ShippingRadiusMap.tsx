import { Center } from '@mantine/core';
import { GoogleMap, useJsApiLoader, CircleF } from '@react-google-maps/api';

export default function ShippingRadiusMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />
}

function Map() {
  const center = {
    lat: 35.221,
    lng: -80.81,
  };
  
  const containerStyle = {
    width: '400px',
    height: '400px',
  };

  return (
    <Center>
      <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle} mapContainerClassName="map-container">
        <CircleF
          center = {center}
          radius = {20500}
          options = {{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2, fillColor: "#FF0000", fillOpacity: 0.35 }}
        />
      </GoogleMap>
    </Center>
  )
}