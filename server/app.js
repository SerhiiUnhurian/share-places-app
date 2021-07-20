const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places');

const app = express();
const port = process.env.PORT || 5000;

app.use('/api/places', placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred.' });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
