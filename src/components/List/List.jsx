import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  const [age, setAge] = React.useState('');

  console.log(isLoading, 'inside of places')

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div style={{ padding: 25 }}>
      <Typography variant="h4" sx={{mb: 2}}>Kontejneri</Typography>
      {false ? (
        <div sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
        {console.log('places in list', places)}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="containers">Containers</InputLabel>
          <Select
            labelId="containers"
            id="containers_select"
            value={age}
            label="Containers"
            onChange={handleChange}
          >
            <MenuItem value={10}>Staklo</MenuItem>
            <MenuItem value={20}>Papir</MenuItem>
            <MenuItem value={30}>Plastika-Tetra-Metal</MenuItem>
            <MenuItem value={30}>Mijesani komunalni otpad</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="notifications">Notifications</InputLabel>
          <Select
            labelId="notifications"
            id="notifications_select"
            value={age}
            label="Notifications"
            onChange={handleChange}
          >
            <MenuItem value={10}>News</MenuItem>
            <MenuItem value={20}>Activities</MenuItem>
            <MenuItem value={30}>Problems</MenuItem>
          </Select>
        </FormControl>
          <Grid container spacing={3} sx={{height: '75vh', overflow: 'auto', marginTop: '10px'}}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
