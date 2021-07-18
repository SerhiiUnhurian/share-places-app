import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Alert from '@material-ui/lab/Alert';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from '../../places/components/placeFormStyles';
import Loading from '../../shared/components/Loading';
import { useAuth } from '../../shared/context/AuthContext';

const validateForm = values => {
  const errors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const PasswordResetForm = () => {
  const classes = useStyles();
  const { resetPassword } = useAuth();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handlePasswordReset = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setMessage(null);
      await resetPassword(values.email);
      setSubmitting(false);
      setMessage('An email with instructions has been sent to your email.');
      values.email = '';
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <VpnKeyIcon />
      </Avatar>
      <Typography className={classes.title} component="h1" variant="h5">
        Password Reset
      </Typography>
      {error && <Alert severity="warning">{error.message}</Alert>}
      {message && <Alert severity="info">{message}</Alert>}
      <Formik
        initialValues={{ email: '' }}
        validate={validateForm}
        onSubmit={handlePasswordReset}
      >
        {({ submitForm, isSubmitting, isValid }) => (
          <Form className={classes.form}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Field
                  component={TextField}
                  variant="outlined"
                  type="text"
                  name="email"
                  label="Email"
                  fullWidth
                />
              </Grid>
              <Grid item className={classes.submit} style={{ width: '100%' }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                  fullWidth
                >
                  Reset
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
          <Link to="/registration" component={RouterLink} variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
        <Grid item>
          <Link to="/login" component={RouterLink} variant="body2">
            Already have an account? Log In
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PasswordResetForm;
