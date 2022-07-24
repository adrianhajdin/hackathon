import React, { useEffect, useState } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

import containers from '../../data/kontejner.json'
import { useSpeechSynthesis } from 'react-speech-kit';

const Map = () => {
  const [directions, setDirections] = useState()
  const [instructions, setInstructions] = useState([])
  const { speak } = useSpeechSynthesis();

  const [test, setTest] = useState(false)
  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lng: Number(containers.result.records[0].X.replace(',', '.')), lat: Number(containers.result.records[0].Y.replace(',', '.')) };
    const destination = { lng:Number(containers.result.records[15].X.replace(',', '.')), lat: Number(containers.result.records[15].Y.replace(',', '.'))};

    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: containers.result.records.slice(0,100).filter((_, i) => i % 10 === 0).map((place) => ({
        location: new google.maps.LatLng(Number(place.Y.replace(',', '.')), Number(place.X.replace(',', '.')))
      }))},
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  }, [])


  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lng: Number(containers.result.records[0].X.replace(',', '.')), lat: Number(containers.result.records[0].Y.replace(',', '.')) };
    const destination = { lng:Number(containers.result.records[15].X.replace(',', '.')), lat: Number(containers.result.records[15].Y.replace(',', '.'))};

    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: containers.result.records.slice(0,100).filter((_, i) => i % 10 === 0).map((place) => ({
        location: new google.maps.LatLng(Number(place.Y.replace(',', '.')), Number(place.X.replace(',', '.')))
      }))},
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
           console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [])

  useEffect(() => {
    const instructions1 = directions?.routes[0].legs.map((leg) => {
      return leg.steps.map((step) => {
        return step.instructions.replace(/<[^>]*>?/gm, '')
      })
    })

    if(instructions) {
      instructions1?.forEach((instructionList) => {
            instructionList?.forEach((instruction) => {
              console.log(instruction)
              speak({ text: instruction })
            })
          })
    }
  }, [test])

  const GoogleMapExample = withGoogleMap(props => (
    <GoogleMap defaultCenter={{ lat: 45.3271, lng: 14.4422}} defaultZoom={13}>
      <DirectionsRenderer directions={directions} />
    </GoogleMap>
));

return (
    <div>
        <button onClick={() => setTest(true)}>Speak</button>
        <GoogleMapExample
          containerElement={<div style={{ height: `100vh`, width: "100vw" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
    </div>
  );
}


const RealMap = () => {
  const MapLoader = withScriptjs(Map);
  
  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAA24-vJbaqBTTxPMBdIHjPhLDi6lHDxyo"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default RealMap;