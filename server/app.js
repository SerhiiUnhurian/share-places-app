require('dotenv').config();
const express = require('express');
const HttpError = require('./models/httpError');

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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
