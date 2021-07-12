import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import Map from './Map';

const MapDialog = ({ title, open, onClose, center, zoom }) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={onClose}
      aria-labelledby="map-dialog-title"
    >
      <DialogTitle id="map-dialog-title" onClose={onClose}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Map center={center} zoom={zoom} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;

// const MapDialog = ({ title, open, onClose, center, zoom }) => {
//   return (
//     <Dialog onClose={onClose} aria-labelledby="map-dialog-title" open={open}>
//       <DialogTitle id="map-dialog-title" onClose={onClose}>
//         {title}
//       </DialogTitle>
//       <DialogContent>
//         <Map
//           isMarkerShown
//           googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
//           loadingElement={
//             <div style={{ height: `100%`, paddingRight: '2px' }} />
//           }
//           containerElement={<div container style={{ height: '600px' }} />}
//           mapElement={<div style={{ height: `100%`, paddingLeft: '1px' }} />}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default MapDialog;

// const MapDialog = ({ title, open, onClose, center, zoom }) => {
//   const mapRef = useRef();

//   useEffect(() => {
//     new window.google.maps.Map(mapRef.current, {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom,
//     });

//     new window.google.maps.Marker({ position: center, map: map });
//   }, [center, zoom]);

//   return (
//     <Dialog onClose={onClose} aria-labelledby="map-dialog-title" open={open}>
//       <DialogTitle id="map-dialog-title" onClose={onClose}>
//         {title}
//       </DialogTitle>
//       <DialogContent
//         ref={mapRef}
//         dividers
//         style={{ width: '100%', height: '100%' }}
//       ></DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default MapDialog;
