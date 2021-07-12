import { List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserItem from './UserItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2, 'auto'),
  },
}));

const UserList = ({ items }) => {
  const classes = useStyles();

  if (items.length === 0) {
    return (
      <Typography variant="subtitle1" align="center">
        No users to display.
      </Typography>
    );
  }

  return (
    <List aria-label="list of active users" className={classes.root}>
      {items.map(({ id, imageUrl, name, places }) => (
        <UserItem
          key={id}
          id={id}
          imageUrl={imageUrl}
          name={name}
          placesCount={places}
        />
      ))}
    </List>
  );
};

export default UserList;
