import React from 'react';
// import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
// import Rating from '@material-ui/lab/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6}>
      {/* <CardMedia
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            test
          </Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:2, marginBottom: 2}}>
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            test
          </Typography>
        </Box>
      </CardContent> */}
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
