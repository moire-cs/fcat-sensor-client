import { SetStateAction, memo, useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import api from '@/mapsapi.env.json';
import { Plot } from '@/util/types';
//add maps api key to src/mapsapi.env.json file. in production, gotta protect this key with web URL!

export const DynamicPlotMap = ({ plots }: { plots: Array<Plot> }) => {
  const [data, setData] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api.MapsAPIKey,
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 0.38965848016674315,
      lng: -79.68464785311586,
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback((_map: any) => {
    setMap(null);
  }, []);
  return (
    <div style={{ height: 450 }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{ lat: 0.38965848016674315, lng: -79.68464785311586 }}
          zoom={10}
          onLoad={onLoad}
        >
          {plots.map((plot) => (
            <Marker
              key={plot.id}
              position={{ lat: plot.latitude, lng: plot.longitude }}
            />
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};
