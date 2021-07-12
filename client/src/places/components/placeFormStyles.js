import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3, 3),
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
  links: {
    marginTop: theme.spacing(2),
  },
}));
