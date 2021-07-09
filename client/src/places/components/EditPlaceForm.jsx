import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  Typography,
  Paper
} from '@material-ui/core';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
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
    errors.title = 'Title should be more than 3 characters long.';
  }

  return errors;
};

const EditPlaceForm = ({ place }) => {
  const classes = useStyles();

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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
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
                    defaultValue={place[name]}
                    InputProps={{ notched: true }}
                    multiline={!!multiline}
                    rows={multiline && 4}
                    fullWidth
                  />
                </Grid>
              ))}
              {isSubmitting && <LinearProgress />}
              <Grid item className={classes.submit}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default EditPlaceForm;
