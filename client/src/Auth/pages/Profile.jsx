import {
  Avatar,
  Button,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import { Link as RouterLink } from 'react-router-dom';
import { useStyles } from '../../places/components/placeFormStyles';
import { useAuth } from '../../shared/context/AuthContext';

const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography className={classes.title} variant="h5">
          {currentUser.displayName}
        </Typography>
        <Typography paragraph>Email: {currentUser.email}</Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          component={RouterLink}
          to="/edit-profile"
        >
          Edit
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
