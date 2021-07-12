import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useStyles } from '../../places/components/placeFormStyles';
import Loading from '../../shared/components/Loading';
import { useAuth } from '../../shared/context/AuthContext';

const INITIAL_FORM_VALUES = {
  email: '',
  password: '',
};

const FORM_INPUTS = [
  {
    name: 'email',
    label: 'Email *',
  },
  {
    name: 'password',
    label: 'Password *',
  },
];

const validateForm = values => {
  const errors = {};
  const email = values.email.trim();
  const password = values.password.trim();

  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 5) {
    errors.password = 'Password should be more than 5 characters long';
  }
  return errors;
};

const LoginForm = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      login();
      alert(JSON.stringify(values, null, 2));
      history.push('/');
    }, 500);
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validate={validateForm}
        onSubmit={handleLogin}
      >
        {({ submitForm, isSubmitting, isValid }) => (
          <Form className={classes.form}>
            <Grid container direction="column" spacing={3}>
              {FORM_INPUTS.map(({ name, label }) => (
                <Grid item key={name}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    type="text"
                    name={name}
                    label={label}
                    fullWidth
                  />
                </Grid>
              ))}
              <Grid item className={classes.submit} style={{ width: '100%' }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                  fullWidth
                >
                  Sign in
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
          <Link to="/password-reset" component={RouterLink} variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginForm;
