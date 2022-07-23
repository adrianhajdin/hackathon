import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import mapStyles from './mapStyles';

import { Paper, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, isLoading }) => {
  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <div style={{ height: '85vh', width: '100%', marginTop: 30 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCjx0VcQOSzfyAtO--jUTcRIHtwnjT76fQ' }}
        center={{lat:  45.327063100000004, lng: 14.44217599999999}}
        defaultZoom={20}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >

        {!isLoading && places.length && places.map((place, i) => (
          <div
            sx={{ position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 } }}
            lat={Number(place.Y.replace(',', '.'))}
            lng={Number(place.X.replace(',', '.'))}
            key={i}
          >
            {isMobile
              ? <LocationOnOutlinedIcon color="primary" fontSize="medium" />
              : (
                <Paper elevation={3} sx={{padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',}}>
                  <Typography variant="subtitle2" gutterBottom>Kontejner</Typography>
                  {/* <img
                    sx={{ cursor: 'pointer' }}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  /> */}
                </Paper>
              )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
