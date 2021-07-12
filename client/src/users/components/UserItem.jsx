import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const UserItem = ({ id, imageUrl, name, placesCount }) => {
  const sharedPlaces = `${placesCount} shared ${
    placesCount === 1 ? 'place' : 'places'
  }`;

  const renderLink = forwardRef((itemProps, ref) => (
    <RouterLink to={`/${id}/places`} ref={ref} {...itemProps} />
  ));

  return (
    <li key={id}>
      <ListItem button component={renderLink}>
        <ListItemAvatar>
          <Avatar src={imageUrl} alt={`${name} avatar`}>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={sharedPlaces}></ListItemText>
      </ListItem>
    </li>
  );
};

export default UserItem;
