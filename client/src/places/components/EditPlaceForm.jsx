import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import Loading from '../../shared/components/Loading';
import { useStyles } from './placeFormStyles';

const FORM_INPUTS = [
  {
    name: 'title',
    label: 'Title',
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

  if (!title) {
    errors.title = 'Required';
  } else if (title.length < 5) {
    errors.title = 'Title should be more than 4 characters long.';
  }

  return errors;
};

const EditPlaceForm = ({ place }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleUpdatePlace = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
    }, 500);
  };

  const handleCancel = () => {
    history.goBack();
  };

  const initialFormValues = {
    title: place.title,
    description: place.description,
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <EditLocationIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit place
      </Typography>
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={handleUpdatePlace}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container direction="column" spacing={3}>
              {FORM_INPUTS.map(({ name, label, multiline }) => (
                <Grid item>
                  <Field
                    component={TextField}
                    variant="outlined"
                    type="text"
                    name={name}
                    label={label}
                    InputProps={{ notched: true }}
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
                    Save
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

export default EditPlaceForm;
