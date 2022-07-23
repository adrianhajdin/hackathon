import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
// import Rating from '@material-ui/lab/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6}>
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Lokacija</Typography>
          <Typography gutterBottom variant="subtitle1">{place.LOKACIJA}</Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Vrsta Posude</Typography>
          <Typography gutterBottom variant="subtitle1">{place.VRSTA_POSUDE}</Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Volumen</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.VOLUMEN}
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default PlaceDetails;
