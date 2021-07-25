const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/httpError');
const getCoordsForAddress = require('../utils/location');

const PLACES = [
  {
    id: '1',
    userId: '1',
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
    id: '2',
    userId: '2',
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
    id: '3',
    userId: '2',
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
    id: '4',
    userId: '2',
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
    id: '5',
    userId: '3',
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

const getPlaces = (req, res, next) => {
  res.json({ places: PLACES });
};

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = PLACES.find(p => p.id === placeId);

  if (!place) {
    return next(new HttpError('Place not found', 404));
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = PLACES.filter(p => p.userId === userId);

  if (places.length === 0) {
    return next(new HttpError('No places found', 404));
  }
  res.json({ places });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, address, userId } = req.body;
  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const newPlace = {
    id: uuidv4(),
    title,
    description,
    address,
    coordinates,
    userId,
  };
  PLACES.push(newPlace);
  res.status(201).json({ place: newPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  const placeIndex = PLACES.findIndex(p => p.id === placeId);

  if (placeIndex < 0) {
    return next(new HttpError('Place not found', 404));
  }
  // TODO: if description is undefined?
  const updatedPlace = { ...PLACES[placeIndex], title, description };
  PLACES[placeIndex] = updatedPlace;
  res.json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  const placeIndex = PLACES.findIndex(p => p.id === placeId);

  if (placeIndex < 0) {
    return next(new HttpError('Place not found', 404));
  }
  const deletedPlace = PLACES[placeIndex];
  PLACES.splice(placeIndex, 1);
  res.json({ place: deletedPlace });
};

exports.getPlaces = getPlaces;
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
