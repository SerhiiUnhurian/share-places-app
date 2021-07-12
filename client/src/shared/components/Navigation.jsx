import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles(theme => ({
  navLinks: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    '& > .active, & > :hover': {
      backgroundColor: theme.palette.primary.dark,
      transitionDuration: theme.transitions.duration.shorter,
    },
  },
}));

function MenuItemLink(props) {
  return (
    <Route
      exact
      path={props.to}
      children={({ match }) => (
        <MenuItem selected={match} component={NavLink} {...props} />
      )}
    />
  );
}

const Navigation = () => {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <>
      {isMobile ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
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
            onClose={handleMenuClose}
          >
            <MenuItemLink to="/" onClick={handleMenuClose}>
              All users
            </MenuItemLink>
            {currentUser && (
              <MenuItemLink to="/uid/places" onClick={handleMenuClose}>
                My places
              </MenuItemLink>
            )}
            {currentUser && (
              <MenuItemLink to="/places/new" onClick={handleMenuClose}>
                Add place
              </MenuItemLink>
            )}
            {!currentUser ? (
              <MenuItemLink to="/login" onClick={handleMenuClose}>
                Login
              </MenuItemLink>
            ) : (
              <MenuItemLink to="/login" onClick={handleLogout}>
                Logout
              </MenuItemLink>
            )}
          </Menu>
        </div>
      ) : (
        <nav className={classes.navLinks}>
          <Button exact to="/" component={NavLink} color="inherit">
            All users
          </Button>
          {currentUser && (
            <>
              <Button exact to="/1/places" component={NavLink} color="inherit">
                My places
              </Button>
              <Button
                exact
                to="/places/new"
                component={NavLink}
                color="inherit"
              >
                Add place
              </Button>
            </>
          )}
          {!currentUser ? (
            <Button exact to="/login" component={NavLink} color="inherit">
              Login
            </Button>
          ) : (
            <Button
              exact
              to="/login"
              component={NavLink}
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </nav>
      )}
    </>
  );
};

export default Navigation;
