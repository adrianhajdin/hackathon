import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading, tickets }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div style={{ padding: 25}}>
      <Typography variant="h4" sx={{mb: 2}}>Live Map</Typography>
      {false ? (
        <div sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
        <FormControl fullWidth sx={{ mb: 5 }}>
          <InputLabel id="containers">Containers</InputLabel>
          <Select
            labelId="containers"
            id="containers_select"
            value={type}
            label="Containers"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"trash"}>Trash</MenuItem>
            <MenuItem value={"tickets"}>Tickets</MenuItem>
          </Select>
        </FormControl>
          <Grid container spacing={3} sx={{height: '75vh', overflow: 'auto'}}>
          {type === 'tickets' ?
            tickets.map((ticket, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={ticket} />
              </Grid>
            ))
          :
            places?.map((place, i) => (
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
