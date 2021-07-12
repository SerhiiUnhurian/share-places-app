import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import DeletePlaceDialog from './DeletePlaceDialog';
import MapDialog from './MapDialog';

const useStyles = makeStyles(theme => ({
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
}));

const PlaceItem = props => {
  const { id, title, description, imageUrl, address, userId, coordinates } =
    props;
  const classes = useStyles();
  const [openMap, setOpenMap] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { currentUser } = useAuth();

  const handleMapOpen = () => {
    setOpenMap(true);
  };

  const handleMapClose = () => {
    setOpenMap(false);
  };

  const handleConfirmModalOpen = () => {
    setOpenConfirmModal(true);
  };

  const handleConfirmModalClose = () => {
    setOpenConfirmModal(false);
  };

  const handleDeletePlace = () => {
    setOpenConfirmModal(false);
    console.log('PLACE DELETED');
  };

  return (
    <>
      <Grid item key={id} xs={12} sm={6} md={4}>
        <Card>
          <CardMedia className={classes.cardMedia} image={imageUrl} />
          <CardContent>
            <Typography variant="h6" color="textPrimary">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {address}
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleMapOpen} color="primary">
              View on Map
            </Button>
            {currentUser && (
              <>
                <Button
                  to={`/places/${id}`}
                  component={RouterLink}
                  color="primary"
                >
                  Edit
                </Button>
                <Button onClick={handleConfirmModalOpen} color="secondary">
                  Delete
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
      <MapDialog
        title={address}
        open={openMap}
        onClose={handleMapClose}
        center={coordinates}
        zoom={8}
      />
      <DeletePlaceDialog
        open={openConfirmModal}
        onClose={handleConfirmModalClose}
        onConfirm={handleDeletePlace}
      />
    </>
  );
};

export default PlaceItem;
