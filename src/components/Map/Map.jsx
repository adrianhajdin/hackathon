import React, { useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import plastic from '../../assets/plastic.svg';
import glass from '../../assets/glass.svg';
import paper from '../../assets/paper.svg';
import recycle from '../../assets/recycle.svg';
import trash from '../../assets/trash-bin.png';
import mapStyles from './mapStyles';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

const clusterMarker = {
  color: 'rgb(255, 255, 255)',
  background: '#1978c8',
  borderRadius: '50%',
  padding: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
}

const pointMarker = {
  color:' rgb(255, 255, 255)',
  background:' #19c822',
  borderRadius: '50%',
  padding: '5px',
  width: '5px',
  height: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}


const GenerateIcon = (type) =>{
  switch (type) {
    case 'STAKLO':
      return <img src={glass} width={50} />;
    case 'PLASTIKA':
      return <img src={plastic} width={50} />;
    case 'MIJEANI KOMUNALNI OTPAD':
      return <img src={trash} width={50} />;
    case 'PLASTIKA-TETRA-METAL':
      return <img src={recycle} width={50} />;
      case 'PAPIR':
        return <img src={paper} width={50} />;
    default:
      break;
  }
} 


const Marker = ({ children }) => children;

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, isLoading, clusters, setNewBounds, supercluster, setZoom, setIsLoading, type, tickets }) => {
  console.log(tickets)
  const mapRef = useRef();

  return (
    <div style={{ height: '85vh', width: '100%', marginTop: 30 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCjx0VcQOSzfyAtO--jUTcRIHtwnjT76fQ' }}
        center={coords.lat ? coords : { lat: 45.3271, lng: 14.4422}}
        defaultCenter={{ lat: 45.3271, lng: 14.4422}}
        defaultZoom={17}
        yesIWantToUseGoogleMapApiInternals
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setNewBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });

          setZoom(e.zoom);
            setBounds([
              e.bounds.nw.lng,
              e.bounds.se.lat,
              e.bounds.se.lng,
              e.bounds.nw.lat
            ]);
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
      
         {type === 'trash' && clusters &&
            !isLoading && clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const { cluster: isCluster, point_count: pointCount } = cluster.properties;

              if (isCluster) {
                let size = (pointCount * 25) / places.length;

                return (
                  <Marker
                    lat={latitude}
                    lng={longitude}
                    key={`cluster-${cluster.id}`}
                    style={clusterMarker}
                  >
                    <div
                      style={{...clusterMarker, width: size * 10 + "px", height: size * 10 + "px"}}
                      onClick={() => {
                        const expansionZoom = Math.min(
                          supercluster.getClusterExpansionZoom(cluster.id),
                          20
                        );
                        mapRef.current.setZoom(expansionZoom);
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>
                );
              } else {
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    lat={latitude}
                    lng={longitude}
                  >
                    <div style={pointMarker}>
                    {GenerateIcon(cluster.vrstaPosude)}

                    </div>
                  </Marker>
                );
              }
            })}
            {console.log(tickets)}
            {type === 'tickets' && tickets?.map((ticket) => (
              <div lat={ticket.x} lng={ticket.y}>
                <GppMaybeIcon size="large" />
              </div>
            ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
