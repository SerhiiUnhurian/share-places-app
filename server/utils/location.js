const axios = require('axios');
const HttpError = require('../models/httpError');

const getCoordsForAddress = async address => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_API_KEY}`
  );
  const { data } = response;

  if (data.status === 'OK') {
    const coordinates = data.results[0].geometry.location;
    return coordinates;
  } else if (data.status === 'ZERO_RESULTS') {
    throw new HttpError('Could not find location for the address.', 422);
  } else {
    throw new HttpError(data.status, 400);
  }
};

module.exports = getCoordsForAddress;
