import {useState} from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

export default function PositionedSnackbar() {

  const [state, setState] = useState({
    open: true,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state; 

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  

  return (
    <Box sx={{ width: 500, zIndex: "2"}}>
      
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="El conductor de ha registrado correctamente!"
        key={vertical + horizontal}
        
      />
    </Box>
  );
}