const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/httpError');

const USERS = [
  {
    id: 'ce5ee1b5-b5c7-5350-8590-f4ece77630b6',
    username: 'Ian Dixon',
    email: 'fijnedat@ki.pn',
    password: '167208',
  },
  {
    id: '910daede-8441-5c89-b874-1292ddbf0aa1',
    username: 'Sam Cook',
    email: 'fi@lufniv.fm',
    password: '744344',
  },
  {
    id: '87dbfa5b-1094-5515-b83f-79c14e121b17',
    username: 'Bess Vaughn',
    email: 'togpuh@fezpubutu.cg',
    password: '855764',
  },
  {
    id: '10ab81a3-72fa-57e6-979c-c4daa10c246d',
    username: 'Ellen Scott',
    email: 'puimi@fob.bh',
    password: '918933',
  },
  {
    id: '114f96b5-1cb2-5c2b-907e-be2c67be3f2f',
    name: 'Lula Lambert',
    email: 'efpen@ajwan.md',
    password: '161548',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  const userExists = USERS.some(u => u.email === email);

  if (userExists) {
    return next(
      new HttpError(`User with the email '${email}' already exists.`, 422)
    );
  }

  const newUser = {
    id: uuidv4(),
    username,
    email,
    password,
  };
  USERS.push(newUser);
  res.status(201).json({ user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = USERS.find(u => u.email === email);

  if (!identifiedUser) {
    return next(new HttpError('User not found', 404));
  }
  if (identifiedUser.password !== password) {
    return next(new HttpError('Passwords do not match', 422));
  }
  res.json({ message: 'Logged in.' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
