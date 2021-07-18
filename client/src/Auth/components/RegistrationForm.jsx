import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useStyles } from '../../places/components/placeFormStyles';
import Loading from '../../shared/components/Loading';
import { useAuth } from '../../shared/context/AuthContext';

const INITIAL_FORM_VALUES = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const FORM_INPUTS = [
  {
    name: 'username',
    label: 'Username *',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email *',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password *',
    type: 'password',
  },
  {
    name: 'passwordConfirm',
    label: 'Confirm Password *',
    type: 'password',
  },
];

const validateForm = values => {
  const errors = {};
  const username = values.username.trim();
  const email = values.email.trim();
  const password = values.password.trim();
  const passwordConfirm = values.passwordConfirm.trim();

  if (!username) {
    errors.username = 'Required';
  } else if (!/^[A-Za-z0-9]{3,}/i.test(username)) {
    errors.username =
      'Username may only contain [A-Z]/[a-z]/[0-9] and must be at least 3 characters long';
  }

  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 6) {
    errors.password = 'Password should be more than 6 characters long';
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Required';
  } else if (password.length < 6) {
    errors.passwordConfirm = 'Password should be more than 6 characters long';
  } else if (passwordConfirm !== password) {
    errors.passwordConfirm = 'Passwords do not match';
  }

  return errors;
};

const RegistrationForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signUp } = useAuth();
  const [error, setError] = useState(null);

  const handleSignUp = async (values, { setSubmitting }) => {
    const { username, email, password } = values;

    try {
      setError(null);
      const userCredential = await signUp(email, password);
      userCredential.user.updateProfile({ displayName: username });
      setSubmitting(false);
      history.push('/');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AccountCircleIcon />
      </Avatar>
      <Typography className={classes.title} component="h1" variant="h5">
        Sign up
      </Typography>
      {error && <Alert severity="warning">{error.message}</Alert>}
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validate={validateForm}
        onSubmit={handleSignUp}
      >
        {({ submitForm, isSubmitting, isValid }) => (
          <Form className={classes.form}>
            <Grid container direction="column" spacing={3} alignItems="stretch">
              {FORM_INPUTS.map(({ name, label, type }) => (
                <Grid item key={name}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    type={type}
                    name={name}
                    label={label}
                    fullWidth
                  />
                </Grid>
              ))}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                  fullWidth
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
            <Loading open={isSubmitting} />
          </Form>
        )}
      </Formik>
      <Grid
        className={classes.links}
        spacing={1}
        container
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Link to="/login" component={RouterLink} variant="body2">
            Already have an account? Log In
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegistrationForm;
