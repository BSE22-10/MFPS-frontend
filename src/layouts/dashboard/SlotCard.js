import React from 'react';
import { Typography, Card, CardContent, Box, Grid, Popover, Modal, Paper } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function SlotCard(props) {
  const status = props.slot.SlotStatus.length === 0 || props.slot.SlotStatus[0].status === false ? false : true;
  console.log(status);
  // console.log(props.slot.SlotStatus.length === 0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    handleOpen();
  };
  const handleDelete = () => {
    // return <MessageModal open={true}/>
    handleOpen2();
  };
  const handleView = () => {
    handleOpen3();
  };
  var cardStyle = {
    backgroundColor: '#6D3D6D',
    color: '#72C1C6',
  };
  var textColor = 'black';
  if (status === true) {
    cardStyle = {
      backgroundColor: '#6D3D6D',
      color: '#72C1C6',
    };
    textColor = '#72C1C6';
  } else {
    cardStyle = {
      backgroundColor: '#72C1C6',
      color: '6D3D6D',
    };
    textColor = '6D3D6D';
  }
  return (
    <div>
      <Paper style={cardStyle} sx={{ height: 200 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <MoreHorizIcon
                sx={{
                  cursor: 'pointer',
                }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              />
              {/* <Popover
id={id}
open={open}
anchorEl={anchorEl}
onClose={handleClose}
anchorOrigin={{
vertical: 'bottom',
horizontal: 'left',
}}
>
<MyPopover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}/>


  <Typography sx={optionStyle
}><DeleteIcon />Delete</Typography>
<Typography sx={{ p: 2,cursor:"pointer" }}>Update</Typography>
</Popover> */}
            </Box>
            <Box
              sx={{
                pointer: 'cursor',
              }}
              onClick={() => {
                console.log('Clicked');
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                pointer: 'cursor',
              }}
            ></Box>
            {/* <p style={{ color: textColor }}>{description}</p> */}
          </Typography>
        </CardContent>
      </Paper>
    </div>
  );
}
