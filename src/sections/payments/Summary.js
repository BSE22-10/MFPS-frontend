import React from 'react';
import { Grid, Typography, Button, Card, List, Box, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Payments from './Payments';

function Summary(props) {
  console.log(props.register);
  var buttonStatus;
  const [submitting, setSubmitting] = useState(null);
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    spacing: 0,
    padding: '5px',
    paddingTop: '5px',
  };
  const style2 = {
    display: 'flex',
    justifyContent: 'space-between',
    spacing: 5,
    padding: '5px',
    paddingTop: '15px',
  };
  if (submitting === null) {
    buttonStatus = (
      <button className="btnNext" type="submit">
        Submit
      </button>
    );
  } else if (submitting === true) {
    buttonStatus = (
      <LoadingButton
        className="btnNext"
        loading
        color="secondary"
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Submitting
      </LoadingButton>
    );
  } else if (submitting === false) {
    buttonStatus = (
      <Button variant="contained" color="success">
        Successfully submitted
      </Button>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // setTimeout(() => {
    //   setSubmitting("yes");
    // }, 1000);

    // submitData(params.program_id, params.intake_id);
    // submitApplication();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ margin: '50px auto' }}
        >
          <Grid item xs={3}>
            <Card
              className="card-content"
              style={{
                borderRadius: '15px',
                boxShadow: '3px 5px 30px -10px rgba(0,0,0,0.50)',
              }}
            >
              <div className="dataReview">
                <List>
                  <Box style={style2}>
                    <Typography variant="h6" style={{ fontWeight: '700' }}>
                      Please confirm your details
                    </Typography>
                    {submitting === null && (
                      <Button onClick={() => props.close(false)}>
                        <EditIcon />
                        Edit
                      </Button>
                    )}
                  </Box>
                  <Divider />
                  {props.register && (
                    <Box style={style}>
                      <span>Email:</span> <p>{props.values.email}</p>
                    </Box>
                  )}

                  <Box style={style}>
                    <span>Number plate:</span>
                    <p>{props.values.numberPlate}</p>
                  </Box>

                  <Box style={style}>
                    <span>Amount:</span> <p>{props.values.amount} UGX</p>
                  </Box>

                  <Divider />
                </List>
              </div>
              <div className="btn">
                {/* {submitting === null && (
                  <div>
                    <Button className="btnBack" onClick={() => setStep(3)}>
                      Back
                    </Button>
                  </div>
                )} */}
                <div>
                  {/* {submitting  ? (
                                          <LoadingButton
                                          className='btnNext'
                                          loading
                                          color="secondary"
                                          loadingPosition="start"
                                          startIcon={<SaveIcon />}
                                          variant="contained"
                                        >
                                          Submitting
                                        </LoadingButton>) : (
                                     <button className='btnNext' type='submit'>Submit</button>
                                )} */}
                  {/* {buttonStatus} */}
                  <Payments value={props.values} register={props.register} />
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Summary;
