/* Imports for Leaflet */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

import { SetStateAction, memo, useCallback, useEffect, useState } from 'react';
import { Plot } from '@/lib/types';
import { SensorNodeCell } from '../tables/cell/sensorNodeCell';
import {
  Language,
  getLocalLanguage,
  useLanguage,
} from '@/LocalizationProvider';
import { decodeCombined } from '@/lib/utils';

function ZoomDisplay() { /* some code to display zoom level on leaflet map --mt */
  const [zoom, setZoom] = useState<number | null>(null);
  useMapEvents({
    zoom: (e) => {
      setZoom(e.target.getZoom());
    },
    load: (e) => {
      setZoom(e.target.getZoom());
    },
  });
  return (
    <div className="leaflet-top leaflet-left" style={{ marginTop: '80px' }}>
      <div className="leaflet-control leaflet-bar" style={{ padding: '4px 8px', background: 'white' }}>
        Zoom: {zoom ?? '...'}
      </div>
    </div>
  );
}

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
  const [initialLanguage] = useState<Language>(getLocalLanguage());
  const [map, setMap] = useState(null);
  const [selectedPlotOpen, setSelectedPlotOpen] = useState(false);
  useEffect(() => {
    setSelectedPlotOpen(selectedPlot !== null);
  }, [selectedPlot]);

  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const { language } = useLanguage();
  useEffect(() => {
    if (language !== getLocalLanguage()) {
      setIsLanguageChanged(true);
    }
  }, [language]);

  const getCenter = () => {
    const lat = plots.reduce((acc, curr) => acc + curr.latitude, 0);
    const lng = plots.reduce((acc, curr) => acc + curr.longitude, 0);
    return {
      lat: lat / plots.length,
      lng: lng / plots.length,
    };
  };

  const getZoom = () => {
    const center = getCenter();
    const maxLat = Math.max(...plots.map((plot) => plot.latitude));
    const minLat = Math.min(...plots.map((plot) => plot.latitude));
    const maxLng = Math.max(...plots.map((plot) => plot.longitude));
    const minLng = Math.min(...plots.map((plot) => plot.longitude));
    const latDiff = Math.abs(maxLat - minLat);
    const lngDiff = Math.abs(maxLng - minLng);
    const latZoom = Math.floor(Math.log2(360 / latDiff));
    const lngZoom = Math.floor(Math.log2(360 / lngDiff));
    return Math.min(latZoom, lngZoom);
  };

  const onUnmount = useCallback((_map: any) => {
    setMap(null);
  }, []);
  return (
    <>
      {isLanguageChanged && (
        <p>
          {decodeCombined(
            '[en]Language changed, please reload the page to reload map.[es]Idioma cambiado, por favor recargue la página para recargar el mapa.',
            language,
          )}
        </p>
      )}
      <div className="h-[300px] md:h-[600px]">
        {/* Leaflet Map Implementation 
	    FIXME: hardcoded IP address below only works at FCAT */}
        <MapContainer
          center={getCenter()}
          zoom={getZoom()}
          style={{ height: '100%', width: '100%' }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		maxNativeZoom={18}
                maxZoom={22}
              />
            </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="OpenTopoMap">
            <TileLayer
             url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
             attribution='Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
             maxNativeZoom={17}
	     maxZoom={22}
           />
         </LayersControl.BaseLayer>

	 <LayersControl.BaseLayer name="Esri Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
            />
          </LayersControl.BaseLayer>
	  <LayersControl.BaseLayer name="Esri Topo">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
	      maxNativeZoom={18}
	      maxZoom={22}
            />
          </LayersControl.BaseLayer>
	  <LayersControl.BaseLayer name="Stamen Terrain">
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
              attribution='&copy; Stadia Maps, &copy; Stamen Design, &copy; OpenMapTiles, &copy; OpenStreetMap'
              maxNativeZoom={18}
	      maxZoom={22}
            />
          </LayersControl.BaseLayer>
	  <LayersControl.BaseLayer name="OSM Humanitarian Team">
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors, Tiles style by HOT'
              maxNativeZoom={20}
	      maxZoom={22}
            />
          </LayersControl.BaseLayer>
	  
          <LayersControl.Overlay checked name="FCAT Orthomosaic">
              <TileLayer 
                url="http://192.168.1.8:8888/orthomosaic/{z}/{x}/{y}.png"
                maxZoom={22}
                maxNativeZoom={22}
                tms={true}
              />
            </LayersControl.Overlay>
          </LayersControl>

	  <LayersControl.Overlay name="GBIF Occurrences">
            <TileLayer
              url="https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point"
              attribution="GBIF"
              maxNativeZoom={18}
              maxZoom={22}
              opacity={0.7}
            />
          </LayersControl.Overlay>

            <ZoomDisplay />  {/* this is where we show the zoom level */ }
          {/* Markers for each plot */}
          {plots.map((plot) => (
            <Marker
              key={plot.id}
              position={{
                lat: plot.latitude,
                lng: plot.longitude,
              }}
              eventHandlers={{
                click: () => {
                  setSelectedPlot(plot.id);
                },
              }}
              icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41] })}
            >
              {/* Popup for selected plot */}
              <Popup>
                {plot.nodeID ? (
                  <SensorNodeCell plotId={plot.nodeID} />
                ) : (
                  <span>{decodeCombined('[en]No Node Assigned[es]Ningún nodo asignado', language)}</span>
                )}
                <div>
                  <strong>Lat:</strong> {plot.latitude.toFixed(5)}
                  <br />
                  <strong>Lng:</strong> {plot.longitude.toFixed(5)}
                  <br />
                  <strong>Desc:</strong> {plot.description}
                  <br />
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Listen for map clicks to clear selection */}
          <MapClickHandler onClick={() => setSelectedPlotOpen(false)} />
        </MapContainer>
      </div>
    </>
  );
};

export const MemoizedDynamicPlotMapLeaflet = memo(
  DynamicPlotMap,
  (prev, next) =>
    prev.selectedPlot === next.selectedPlot &&
    prev.plots === next.plots,
);

// Handles map clicks to clear selection when clicking outside markers
function MapClickHandler({ onClick }: { onClick: () => void }) {
  useMapEvents({
    click: () => {
      onClick(); // clear selection
    },
  });
  return null; // nothing visible
}
