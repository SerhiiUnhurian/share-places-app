import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    minWidth: 320,
  },
});

const DeletePlaceDialog = ({ open, onClose, onConfirm }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      classes={classes}
    >
      <DialogTitle id="responsive-dialog-title">{'Delete Place'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the place?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePlaceDialog;
