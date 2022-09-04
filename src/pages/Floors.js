import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Modal, Box, Button, Grid } from '@mui/material';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import AddFloor from 'src/sections/floors/AddFloor';
import FloorCard from 'src/sections/floors/FloorCard';

export const CloseContext = createContext();

function Floors() {
  const [loading, setLoading] = useState(true);
  const [floors, setFloors] = useState();
  const [close, setClosing] = useState(false);
  var count = 0;
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
    p: 0,
    marginTop: 1,
  };

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/floors`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        setLoading(false);
        console.log(data.data);
        setFloors(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [close]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [changes, setChanges] = useState(0);

  return (
    <CloseContext.Provider value={{ close, setClosing }}>
      <Grid container maxWidth="100%" alignItems="center" spacing={2}>
        <Grid item xs={11}>
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <h2>Floors</h2>

              <Button
                sx={{
                  fontSize: '14px',
                  padding: '8px 40px',
                  backgroundColor: '#542A52',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: '#6D3D6D',
                  },
                }}
                className="btnNext"
                onClick={handleOpen}
              >
                Add
                <AddIcon />
              </Button>
            </Box>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} flexGrow={1}>
              <AddFloor note={changes} changes={setChanges} close={handleClose} setClosing={setClosing} />
            </Box>
          </Modal>
          {loading ? (
            <div className="loading">
              <BeatLoader color="#542A52" loading={loading} size={40} />
            </div>
          ) : (
            <div>
              <Box sx={{ flexGrow: 1 }}>
                {/* <Grid container 
          spacing={{ xs: 1, md: 1 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
              padding: "5px",
              paddingTop: "20px",
              marginLeft: "15px"
          }}
          > */}
                <Grid container spacing={3}>
                  {floors.map((floor) => {
                    count++;
                    //  <ModalContext.Provider value={modalStatus}>
                    return (
                      <Grid item xs={6} sm={3.7}>
                        <FloorCard
                          sx={{
                            cursor: 'pointer',
                          }}
                          floor={floor}
                          note={changes}
                          changes={setChanges}
                          count={count}
                        />
                      </Grid>
                    );

                    //    </ModalContext.Provider>
                  })}
                </Grid>
              </Box>
            </div>
          )}
        </Grid>
      </Grid>
    </CloseContext.Provider>
  );
}

export default Floors;
