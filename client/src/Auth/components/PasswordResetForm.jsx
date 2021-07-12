import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from '../../places/components/placeFormStyles';
import Loading from '../../shared/components/Loading';

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

  const handlePasswordReset = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
    }, 500);
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <VpnKeyIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Password Reset
      </Typography>
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
