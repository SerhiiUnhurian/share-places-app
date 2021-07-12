import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlaceItem from './PlaceItem';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    padding: theme.spacing(4),
  },
}));

const PlaceList = ({ items }) => {
  const classes = useStyles();

  if (items.length === 0) {
    return (
      <Typography variant="subtitle1" align="center">
        No places to display.
      </Typography>
    );
  }

  return (
    <Container className={classes.gridContainer}>
      <Grid container spacing={4}>
        {items.map(place => (
          <PlaceItem
            key={place.id}
            id={place.id}
            imageUrl={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            userId={place.userId}
            coordinates={place.coordinates}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default PlaceList;
