import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../../places/components/placeFormStyles';
import Loading from '../../shared/components/Loading';
import { useAuth } from '../../shared/context/AuthContext';

const FORM_INPUTS = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'newPassword',
    label: 'New password',
    type: 'password',
  },
  {
    name: 'newPasswordConfirm',
    label: 'Confirm password',
    type: 'password',
  },
];

const validateForm = values => {
  const errors = {};
  const username = values.username.trim();
  const email = values.email.trim();
  const newPassword = values.newPassword.trim();
  const newPasswordConfirm = values.newPasswordConfirm.trim();

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

  if (newPassword && newPassword.length < 6) {
    errors.newPassword = 'Password should be more than 6 characters long';
  }

  if (newPassword && !newPasswordConfirm) {
    errors.newPasswordConfirm = 'Require';
  } else if (newPassword && newPasswordConfirm.length < 6) {
    errors.newPasswordConfirm =
      'Password should be more than 6 characters long';
  } else if (newPasswordConfirm !== newPassword) {
    errors.newPasswordConfirm = 'Passwords do not match';
  }

  return errors;
};

const EditProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser } = useAuth();
  const { updateEmail, updatePassword, updateUsername } = useAuth();
  const [message, setMessage] = useState(null);

  const initialFormValues = {
    username: currentUser.displayName,
    email: currentUser.email,
    newPassword: '',
    newPasswordConfirm: '',
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSignUp = async (values, { setSubmitting }) => {
    const { username, email, newPassword } = values;
    const promises = [];
    setMessage(null);

    if (username !== currentUser.displayName) {
      promises.push(updateUsername(username));
    }
    if (email !== currentUser.email) {
      promises.push(updateEmail(email));
    }
    if (newPassword) {
      promises.push(updatePassword(newPassword));
    }

    if (promises.length) {
      Promise.all(promises)
        .catch(() => {
          setMessage({ text: 'Failed to update account', severity: 'warning' });
        })
        .finally(() => {
          setSubmitting(false);
          setMessage({
            text: 'Profile updated successfully.',
            severity: 'success',
          });
        });
    } else {
      setMessage({ text: 'Profile data is up to date.', severity: 'info' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          Edit Profile
        </Typography>
        {message && <Alert severity={message.severity}>{message.text}</Alert>}
        <Formik
          initialValues={initialFormValues}
          validate={validateForm}
          onSubmit={handleSignUp}
        >
          {({ submitForm, isSubmitting, isValid }) => (
            <Form className={classes.form}>
              <Grid
                container
                direction="column"
                spacing={3}
                alignItems="stretch"
              >
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
                <Grid container item justify="center" spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting || !isValid}
                      onClick={submitForm}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      onClick={handleCancel}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Loading open={isSubmitting} />
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default EditProfile;
