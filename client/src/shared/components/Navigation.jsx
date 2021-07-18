import { Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { forwardRef, useState } from 'react';
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

const MenuItemLink = forwardRef((props, ref) => {
  return (
    <Route
      exact
      path={props.to}
      children={({ match }) => (
        <MenuItem selected={!!match} component={NavLink} ref={ref} {...props} />
      )}
    />
  );
});

const Navigation = () => {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleMobileMenuOpen = event => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMobileMenuClose();
    handleProfileMenuClose();

    try {
      await logout();
    } catch (err) {}
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={'profile-menu'}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItemLink to="/profile" onClick={handleProfileMenuClose}>
        Profile
      </MenuItemLink>
      <MenuItemLink to="/login" onClick={handleLogout}>
        Logout
      </MenuItemLink>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUser && (
        <MenuItemLink to="/profile" onClick={handleMobileMenuClose}>
          Profile
        </MenuItemLink>
      )}
      <MenuItemLink to="/" onClick={handleMobileMenuClose}>
        All users
      </MenuItemLink>
      {currentUser && (
        <MenuItemLink to="/uid/places" onClick={handleMobileMenuClose}>
          My places
        </MenuItemLink>
      )}
      {currentUser && (
        <MenuItemLink to="/places/new" onClick={handleMobileMenuClose}>
          Add place
        </MenuItemLink>
      )}
      {currentUser && (
        <MenuItemLink to="/login" onClick={handleLogout}>
          Logout
        </MenuItemLink>
      )}
      {!currentUser && (
        <MenuItemLink to="/login" onClick={handleMobileMenuClose}>
          Sign in
        </MenuItemLink>
      )}
      {!currentUser && (
        <MenuItemLink to="/registration" onClick={handleMobileMenuClose}>
          Sign up
        </MenuItemLink>
      )}
    </Menu>
  );

  return (
    <nav>
      {isMobile ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </div>
      ) : (
        <div className={classes.navLinks}>
          <Button exact to="/" component={NavLink} color="inherit">
            All users
          </Button>
          {currentUser ? (
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
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                exact
                to="/login"
                component={NavLink}
                color="inherit"
                variant="outlined"
              >
                Sign in
              </Button>
              <Button
                exact
                to="/registration"
                component={NavLink}
                color="inherit"
                variant="outlined"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      )}
      {renderProfileMenu}
      {renderMobileMenu}
    </nav>
  );
};

export default Navigation;
