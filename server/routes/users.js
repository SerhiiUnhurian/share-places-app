const express = require('express');

const router = express.Router();

router.get('/:uid', (req, res) => {
  const placeId = +req.params.pid;
  const place = PLACES.find(place => place.id === placeId);

  if (!place) {
    return res.json({ message: 'Place not found' });
  }
  res.json({ place });
});

module.exports = router;
