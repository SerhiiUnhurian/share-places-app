const express = require('express');
const { check } = require('express-validator');

const placesController = require('../controllers/placesController');

const router = express.Router();

router.get('/', placesController.getPlaces);
router.get('/:pid', placesController.getPlaceById);
router.get('/user/:uid', placesController.getPlacesByUserId);

router.post(
  '/',
  [check('title').isLength({ min: 5 }), check('address').isLength({ min: 5 })],
  placesController.createPlace
);

router.patch(
  '/:pid',
  [check('title').isLength({ min: 5 })],
  placesController.updatePlace
);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
