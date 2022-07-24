import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@mui/material';

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import containers from './data/kontejner.json'
import useSupercluster from 'use-supercluster'

const App = () => {
  const [data, setData] = useState([]);
  const [zoom, setZoom] = useState(17)
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [newBounds, setNewBounds] = useState(null);

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  
   setIsLoading(true)
    const filteredData =  containers.result.records
    .filter((c) => 
      Number(c.Y.replace(',', '.')) < newBounds?.ne?.lat && 
      Number(c.X.replace(',', '.')) < newBounds?.ne?.lng &&
      Number(c.Y.replace(',', '.')) > newBounds?.sw?.lat && 
      Number(c.X.replace(',', '.')) > newBounds?.sw?.lng)
    .slice(0, 7000)
      .map((place) => ({
        id: place._id,
        vrstaPosude: place['VRSTA OTPADA'],
        volumen: place.VOLUMEN,
        lokacija: place.LOKACIJA,
        type: "Kontejner",
        properties: { 
          cluster: false, 
          category: 'kontejner', 
          id: place._id 
        },
        geometry: {
          type: "Point",
          coordinates: [
            Number(place?.X?.replace(',', '.')),
            Number(place?.Y?.replace(',', '.'))
          ]
        }
      })
    );
 
    setData(filteredData)
    setIsLoading(false);
  }, [newBounds]);

  
  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            childClicked={childClicked}
            places={data}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setChildClicked={setChildClicked}
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            isLoading={isLoading}
            places={data}
            supercluster={supercluster}
            clusters={clusters}
            setNewBounds={setNewBounds}
            setZoom={setZoom}
            setIsLoading={setIsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
