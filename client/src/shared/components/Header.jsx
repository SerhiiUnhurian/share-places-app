import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlaceIcon from '@material-ui/icons/Place';
import Navigation from './Navigation';

const useStyles = makeStyles(theme => ({
  brandname: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <PlaceIcon fontSize="large" />
        <Typography variant="h5" className={classes.brandname}>
          SharePlace
        </Typography>
        <Navigation />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
