const HttpError = require('../models/httpError');

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

const getPlaceById = (req, res, next) => {
  const placeId = +req.params.pid;
  const place = PLACES.find(place => place.id === placeId);

  if (!place) {
    next(new HttpError('Place not found', 404));
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = +req.params.uid;

  const places = PLACES.filter(place => place.userId === userId);

  if (!places) {
    return next(new HttpError('No places found', 404));
  }
  res.json({ places });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
