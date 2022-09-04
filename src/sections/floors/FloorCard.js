import React from 'react';
import { Typography, CardContent, Box, Modal, Paper } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteModal from './deleteModal';
import UpdateModal from './updateModal';

export default function FloorCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpen] = useState(false);
  const [openModal2, setOpen2] = useState(false);
  const [openModal3, setOpen3] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleCloseModal = () => setOpen(false);
  const handleCloseModal2 = () => setOpen2(false);
  const handleCloseModal3 = () => setOpen3(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleOpen();
  };

  const handleDelete = () => {
    handleOpen2();
  };
  const handleView = () => {
    handleOpen3();
  };

  const getUpdateForm = () => {
    setAnchorEl(null);
  };

  const classes = {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 20,
      textAlign: 'center',
      color: 'blue',
      fontFamily: 'Roboto',
      marginTop: 5,
    },
  };

  const checkSize = {
    size: {
      sm: true,
    },
  };

  var cardStyle;
  var textColor;
  if (props.count % 2 === 0) {
    cardStyle = {
      backgroundColor: '#009598',
      color: '#72C1C6',
    };
    textColor = 'white';
  } else {
    cardStyle = {
      backgroundColor: '#72C1C6',
      color: '6D3D6D',
    };
    textColor = '6D3D6D';
  }
  const new_styles = {
    textDecorations: 'underline',
    fontWeight: 500,
    fontSize: {
      xs: 20, //0
      sm: 15, // 600
      md: 20, // 900
      lg: 25, // 1200
      xl: 30, // 1536
    },
    '&:hover': {
      color: '#dbdbdb',
      backgroundColor: 'transparent',
    },
  };

  const description_style = {
    fontSize: {
      xs: 20, //0
      sm: 18, // 600
      md: 18, // 900
      lg: 20, // 1200
      xl: 25, // 1536
    },
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: 450, //0
      sm: 600, // 600
      md: 700, // 900
      lg: 800, // 1200
      xl: 1000, // 1536
    },
    display: 'flex',
    flexDirection: 'column',
  };

  const optionStyle = {
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#6D3D6D' },
  };
  var description = '';

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateModal floor={props.floor} modal={openModal} close={handleCloseModal} change={setOpen} />
        </Box>
      </Modal>

      <Modal
        open={openModal2}
        onClose={handleCloseModal2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteModal
          id={props.floor.id}
          change={setOpen2}
          deleted={props.change}
          url={`${process.env.REACT_APP_API_URL}/floors/delete?floor_id=${props.floor.id}`}
          message={'Are you sure you want to delete this floor?'}
          close={handleCloseModal2}
        />
      </Modal>

      {/* Modal 3 */}
      <Modal
        open={openModal3}
        onClose={handleCloseModal3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <ViewProgramme
            program={props.program}
            modal={openModal}
            close={handleCloseModal}
            change={props.changes}
            note={props.note}
          /> */}
        </Box>
      </Modal>

      <Paper style={cardStyle} sx={{ height: 130 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Typography sx={new_styles} variant="h6" color="white">
                  {props.floor.name}
                </Typography>
              </div>
              <MoreHorizIcon
                sx={{
                  cursor: 'pointer',
                }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <UpdateIcon />
                  Update
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <DeleteIcon />
                  Delete
                </MenuItem>
                <MenuItem onClick={handleView}>
                  <VisibilityIcon />
                  View
                </MenuItem>
              </Menu>
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
            <p style={{ color: textColor }}>{props.floor.no_of_slots} slots</p>
          </Typography>
        </CardContent>
      </Paper>
    </div>
  );
}
