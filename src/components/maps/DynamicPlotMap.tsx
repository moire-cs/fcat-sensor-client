import { SetStateAction, memo, useCallback, useState } from 'react';
import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import api from '@/mapsapi.env.json';
import { Plot } from '@/lib/types';
import { SensorNode } from '../tables/columns/sensorNode';
//add maps api key to src/mapsapi.env.json file. in production, gotta protect this key with web URL!

export const DynamicPlotMap = ({
  plots,
  selectedPlot,
  setSelectedPlot,
}: {
  plots: Array<Plot>;
  selectedPlot: string | null;
  setSelectedPlot: (val: string | null) => void;
}) => {
  const [data, setData] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api.MapsAPIKey,
  });
  const [map, setMap] = useState(null);

  const getCenter = () => {
    if (selectedPlot === null) {
      return { lat: 29.936221571447604, lng: -90.12223460794621 };
    }
    const plot = plots.find((plot) => plot.id === selectedPlot);
    if (plot === undefined) {
      return { lat: 0.38965848016674315, lng: -79.68464785311586 };
    }
    return {
      lat: plot.location.latitude,
      lng: plot.location.longitude,
    };
  };

  // const onLoad = useCallback((map: any) => {
  //   const bounds = new window.google.maps.LatLngBounds({
  //     lat: 29.936221571447604,
  //     lng: -90.12223460794621,
  //   });
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  const onUnmount = useCallback((_map: any) => {
    setMap(null);
  }, []);
  return (
    <div style={{ height: 450 }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={getCenter()}
          zoom={17}
          // onLoad={onLoad}
        >
          {plots.map((plot) => (
            <>
              <Marker
                key={plot.id}
                position={{
                  lat: plot.location.latitude,
                  lng: plot.location.longitude,
                }}
                onClick={() => setSelectedPlot(plot.id)}
              >
                {selectedPlot === plot.id ? (
                  <InfoWindowF
                    position={{
                      lat: plot.location.latitude,
                      lng: plot.location.longitude,
                    }}
                    onCloseClick={() => setSelectedPlot(null)}
                  >
                    <SensorNode plotId={plot.id} />
                  </InfoWindowF>
                ) : null}
              </Marker>
            </>
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};
