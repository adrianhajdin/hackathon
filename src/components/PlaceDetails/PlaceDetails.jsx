import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6}>
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Lokacija</Typography>
          <Typography gutterBottom variant="subtitle1">{place.lokacija}</Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Vrsta</Typography>
          <Typography gutterBottom variant="subtitle1">{place.vrstaPosude === 'MIJEANI KOMUNALNI OTPAD' ? 'MIJESANI OTPAD' : place.vrstaPosude}</Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Volumen</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.volumen}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
