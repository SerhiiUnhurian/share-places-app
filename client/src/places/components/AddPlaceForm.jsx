import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  formWrapper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: green[500],
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  submit: {
    alignSelf: 'center',
  },
}));

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  address: '',
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
    label: 'Description *',
  },
];

const validateForm = values => {
  const errors = {};
  const title = values.title.trim();
  const address = values.address.trim();

  if (!title) {
    errors.title = 'Required';
  } else if (title.length < 3) {
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

  return (
    <div className={classes.formWrapper}>
      <Avatar className={classes.avatar}>
        <AddLocationIcon fontSize="large" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add place
      </Typography>
      <Formik
        className={classes.root}
        initialValues={INITIAL_FORM_STATE}
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
              {FORM_INPUTS.map(({ name, label }) => (
                <Grid item>
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
              {isSubmitting && <LinearProgress />}
              <Grid item className={classes.submit}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Add place
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPlaceForm;
