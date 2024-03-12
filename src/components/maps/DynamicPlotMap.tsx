import { SetStateAction, useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import api from '@/mapsapi.env.json';
//add maps api key to src/mapsapi.env.json file. in production, gotta protect this key with web URL!

export const DynamicPlotMap = () => {
  const [data, setData] = useState([]);
  const isLoaded = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api.MapsAPIKey,
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds({ lat: 0, lng: 0 });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((_map: any) => {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={{ lat: 0, lng: 0 }}
      zoom={2}
      onLoad={(map) => {
        console.log('Map: ', map);
      }}
    />
  ) : (
    <div />
  );
};
