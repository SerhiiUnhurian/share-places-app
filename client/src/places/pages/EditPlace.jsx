import { Container, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import EditPlaceForm from '../components/EditPlaceForm';

const PLACES = [
  {
    id: 1,
    userId: 1,
    title: 'Empire State Building',
    description: 'One of the most famous sky scraper in the world',
    address: '20 W 34th St, New York, NY 10001',
    imageUrl:
      'https://static.ekburg.tv/2019-09-15/6c309450-d7bb-11e9-aa41-1be24cec0e2d/6c294150-d7bb-11e9-aa41-1be24cec0e2d.jpg',
    coordinates: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
  },
  {
    id: 2,
    userId: 2,
    title: 'Empire State Building',
    description: 'One of the most famous sky scraper in the world',
    address: '20 W 34th St, New York, NY 10001',
    imageUrl:
      'https://static.ekburg.tv/2019-09-15/6c309450-d7bb-11e9-aa41-1be24cec0e2d/6c294150-d7bb-11e9-aa41-1be24cec0e2d.jpg',
    coordinates: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
  },
  {
    id: 3,
    userId: 2,
    title: 'Empire State Building',
    description: 'One of the most famous sky scraper in the world',
    address: '20 W 34th St, New York, NY 10001',
    imageUrl:
      'https://static.ekburg.tv/2019-09-15/6c309450-d7bb-11e9-aa41-1be24cec0e2d/6c294150-d7bb-11e9-aa41-1be24cec0e2d.jpg',
    coordinates: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
  },
  {
    id: 4,
    userId: 2,
    title: 'Empire State Building',
    description: 'One of the most famous sky scraper in the world',
    address: '20 W 34th St, New York, NY 10001',
    imageUrl:
      'https://static.ekburg.tv/2019-09-15/6c309450-d7bb-11e9-aa41-1be24cec0e2d/6c294150-d7bb-11e9-aa41-1be24cec0e2d.jpg',
    coordinates: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
  },
  {
    id: 5,
    userId: 3,
    title: 'Empire State Building',
    description: 'One of the most famous sky scraper in the world',
    address: '20 W 34th St, New York, NY 10001',
    imageUrl:
      'https://static.ekburg.tv/2019-09-15/6c309450-d7bb-11e9-aa41-1be24cec0e2d/6c294150-d7bb-11e9-aa41-1be24cec0e2d.jpg',
    coordinates: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
  },
];

const EditPlace = () => {
  const { placeId } = useParams();
  const foundPlace = PLACES.find(place => place.id === +placeId);

  return (
    <Container maxWidth="sm">
      {foundPlace ? (
        <EditPlaceForm place={foundPlace} />
      ) : (
        <Typography variant="subtitle1" align="center">
          Could not find the place.
        </Typography>
      )}
    </Container>
  );
};

export default EditPlace;
