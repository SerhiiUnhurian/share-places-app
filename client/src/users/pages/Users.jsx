import { Container } from '@material-ui/core';
import UserList from '../components/UsersList';

const USERS = [
  {
    id: 1,
    name: 'Adam Rodriguez',
    imageUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
    places: 3,
  },
  {
    id: 2,
    name: 'Richard Tucker',
    imageUrl: 'https://randomuser.me/api/portraits/men/47.jpg',
    places: 3,
  },
  {
    id: 3,
    name: 'Kathryn Johnson',
    imageUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
    places: 3,
  },
];

const Users = () => {
  return (
    <Container>
      <UserList items={USERS} />
    </Container>
  );
};

export default Users;
