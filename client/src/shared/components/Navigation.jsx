import {
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  navLinks: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    '& > .active, & > :hover': {
      color: theme.palette.secondary.main,
      transitionDuration: theme.transitions.duration.shorter,
    },
  },
}));

const MenuItemLink = props => {
  return (
    <Switch>
      <Route
        exact
        path={props.to}
        render={() => <MenuItem selected component={NavLink} {...props} />}
      />
      <Route
        path="/"
        render={() => <MenuItem component={NavLink} {...props} />}
      />
    </Switch>
  );
};

const Navigation = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isMobile ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItemLink to="/" onClick={handleClose}>
              All users
            </MenuItemLink>
            <MenuItemLink to="/uid/places" onClick={handleClose}>
              My places
            </MenuItemLink>
            <MenuItemLink to="/places/new" onClick={handleClose}>
              Add place
            </MenuItemLink>
            <MenuItemLink to="/auth" onClick={handleClose}>
              Authenticate
            </MenuItemLink>
          </Menu>
        </div>
      ) : (
        <Typography className={classes.navLinks}>
          <Link
            exact
            to="/"
            component={NavLink}
            variant="h6"
            color="inherit"
            underline="none"
          >
            All users
          </Link>
          <Link
            exact
            to="/uid/places"
            component={NavLink}
            variant="h6"
            color="inherit"
            underline="none"
          >
            My places
          </Link>
          <Link
            exact
            to="/places/new"
            component={NavLink}
            variant="h6"
            color="inherit"
            underline="none"
          >
            Add place
          </Link>
          <Link
            exact
            to="/auth"
            component={NavLink}
            variant="h6"
            color="inherit"
            underline="none"
          >
            Authenticate
          </Link>
        </Typography>
      )}
    </>
  );
};

export default Navigation;
