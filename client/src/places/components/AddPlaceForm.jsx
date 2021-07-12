import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import Loading from '../../shared/components/Loading';
import { useStyles } from './placeFormStyles';

const INITIAL_FORM_VALUES = {
  title: '',
  address: '',
  description: '',
};

const FORM_INPUTS = [
  {
    name: 'title',
    label: 'Title *',
  },
  {
    name: 'address',
    label: 'Address *',
  },
  {
    name: 'description',
    label: 'Description',
    multiline: true,
  },
];

const validateForm = values => {
  const errors = {};
  const title = values.title.trim();
  const address = values.address.trim();

  if (!title) {
    errors.title = 'Required';
  } else if (title.length < 5) {
    errors.title = 'Title should be more than 3 characters long.';
  }

  if (!address) {
    errors.address = 'Required';
  } else if (address.length < 5) {
    errors.address = 'Address should be more than 5 characters long.';
  }
  return errors;
};

const AddPlaceForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleAddPlace = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
    }, 500);
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AddLocationIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add place
      </Typography>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validate={validateForm}
        onSubmit={handleAddPlace}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container direction="column" spacing={3} alignItems="stretch">
              {FORM_INPUTS.map(({ name, label, multiline }) => (
                <Grid item key={name}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    type="text"
                    name={name}
                    label={label}
                    multiline={!!multiline}
                    rows={multiline && 4}
                    fullWidth
                  />
                </Grid>
              ))}
              <Grid container item justify="center" spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Add place
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
  );
};

export default AddPlaceForm;
