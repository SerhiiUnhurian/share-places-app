require('dotenv').config();
const express = require('express');
const HttpError = require('./models/httpError');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/placesRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  next(new HttpError('Bad request', 400));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred.' });
});

mongoose.connect(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/share_places_app?authSource=admin`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
      });
    }
  }
);
