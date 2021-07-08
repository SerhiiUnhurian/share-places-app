import { Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const useStyles = makeStyles({
  map: {
    height: '50vh',
  },
});

const Map = ({ center, zoom }) => {
  const classes = useStyles();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  if (loadError) {
    return (
      <Typography variant="h5" align="center" color="textSecondary">
        Google Maps cannot be loaded right now, try agin later.
      </Typography>
    );
  }

  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <GoogleMap mapContainerClassName={classes.map} center={center} zoom={zoom}>
      <Marker key={`${center.lat}-${center.lng}`} position={center} />
    </GoogleMap>
  );
};

export default Map;
