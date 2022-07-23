import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import TicketStatus from './components/Client/TicketStatus/TicketStatus';
import TicketManagement from './components/Admin/ContainerManagement';

import containers from './data/kontejner.json'

const App = () => {
  const [type, setType] = useState('restaurants');

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  const [placesWithinBounds, setPlacesWithinBounds] = useState([])
  const [places, setPlaces] = useState([]);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });

    // setPlaces(containers.result.records.slice(0, 200));
    setIsLoading(false);
    
    // setPlaces(containers.result.records.slice(0, 10));

  }, [containers]);

  useEffect(() => {
    if (bounds) {      
      setIsLoading(true);
      const filtered = containers.result.records.filter((container) => 
        Number(container.Y.replace(',', '.')) < bounds.ne.lat && 
        Number(container.X.replace(',', '.')) < bounds.ne.lng &&
        Number(container.Y.replace(',', '.')) > bounds.sw.lat && 
        Number(container.X.replace(',', '.')) > bounds.sw.lng
      ).slice(0, 100);

      setPlacesWithinBounds(filtered);

      setIsLoading(false);
    }
  }, [bounds, type]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <TicketManagement />
      {/* <Grid container spacing={3} style={{ width: '100%' }}>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            childClicked={childClicked}
            places={placesWithinBounds.length ? placesWithinBounds : places}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            isLoading={isLoading}
            places={placesWithinBounds.length ? placesWithinBounds : places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
