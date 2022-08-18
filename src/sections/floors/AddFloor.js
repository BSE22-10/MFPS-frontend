import './addFloor.css';
import React from 'react';
import { Grid, Box, Button, Paper } from '@mui/material';
import { TextField1 } from '../microComponents/TextField';
import { Formik } from 'formik';
import { Card } from '@mui/material';
import * as yup from 'yup';
import { useState, useContext } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { CloseContext } from 'src/pages/Floors';

function AddFloor(props) {
  // const closeContext = useContext(CloseContext);
  const { close, setClosing } = useContext(CloseContext);
  console.log(close);
  const classes = {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 20,
      textAlign: 'center',
      color: 'blue',
      fontFamily: 'Roboto',
    },
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = (value) => {
    setAnchorEl(null);
  };

  function createFloor(values) {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/floors/multipleSlots`,
      data: {
        number_of_slots: values.no_of_slots,
        name: values.name,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        if (data.response == 200) {
          props.setClosing((closing) => !closing);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkProgramName(value) {}

  const validationSchema = yup.object({
    no_of_slots: yup.number().required('Required'),
    name: yup.string().required('Required'),
  });

  const closeModal = () => {
    setModalStatus(true);
  };

  function submitProgram(values) {
    setLoading(true);
  }

  return (
    <div style={classes.root}>
      <Formik
        initialValues={{
          no_of_slots: 0,
          name: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          //   submitProgram(values);
          createFloor(values);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, isValidating, isSubmitting, touched }) => (
          <form className="form-wrap" onSubmit={handleSubmit} method="POST">
            <Paper style={{ maxHeight: '750px', overflow: 'auto' }}>
              <Grid
                container
                spacing={0}
                // direction="column"
                alignItems="center"
                justify="center"
                // justify="center"
                style={{
                  marginLeft: '0px',
                }}
              >
                <Grid
                  item
                  xs={12}
                  width={{
                    xs: 300, //0
                    sm: 400, // 600
                    md: 500, // 900
                    lg: 600, // 1200
                    xl: 700, // 1536
                  }}
                >
                  <Card
                    className="card-content"
                    style={{
                      borderRadius: '15px',
                      boxShadow: '3px 5px 30px -10px rgba(0,0,0,0.50)',
                      marginLeft: '0px',
                      marginBottom: '0px',
                    }}
                  >
                    <div className="form">
                      <h1>Add Floor</h1>
                      <div className="formGrid">
                        <div>
                          <label htmlFor="firstname">
                            Floor name<span className="asterisks">*</span>
                          </label>
                          <br />
                          <div>
                            <TextField1
                              value="Odeke"
                              name="name"
                              placeholder="Floor 4"
                              type="input"
                              size="small"
                              fullWidth
                              sx={{
                                marginTop: '5px',
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="firstname">
                            Number of slots<span className="asterisks">*</span>
                          </label>
                          <br />
                          <div>
                            <TextField1
                              value="Odeke"
                              name="no_of_slots"
                              placeholder="5"
                              type="number"
                              size="small"
                              fullWidth
                              sx={{
                                marginTop: '5px',
                              }}
                            />
                          </div>
                          <br />
                        </div>
                      </div>
                      {/* <Box sx={{ 
                display: 'flex',
              justifyContent: 'flex-start'
              }}><h2>All Programs</h2>
              </Box> */}
                    </div>
                    {/* </div> */}
                    {/* <Grid> */}
                    <Box
                      style={{
                        spacing: '50px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <div>
                        {loading ? (
                          <LoadingButton
                            className="btnNext"
                            loading
                            color="secondary"
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            sx={{
                              fontSize: '14px',
                              padding: '8px 40px',
                              borderRadius: '15px',
                            }}
                          >
                            Adding
                          </LoadingButton>
                        ) : (
                          <Button
                            type="submit"
                            className="submitBtn"
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
                          >
                            Add Floor
                          </Button>
                        )}
                      </div>
                      <div style={{ paddingLeft: '8px' }}>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: '14px',
                            padding: '8px 40px',
                            // backgroundColor: "#542A52",
                            color: '#542A52',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            // border: "none",
                            borderColor: '#542A52',
                            '&:hover': {
                              borderColor: '#6D3D6D',
                            },
                          }}
                          onClick={() => props.close(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddFloor;
