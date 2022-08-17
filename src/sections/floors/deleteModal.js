import * as React from 'react';
import { Box, Grid, Card } from '@mui/material';
import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { CloseContext } from 'src/pages/Floors';

export default function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState(false);
  const { close, setClosing } = useContext(CloseContext);

  const deleteProgram = () => {
    setLoading(true);
    axios({
      method: 'delete',
      url: props.url,

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccess(true);
          setClosing((closing) => !closing);
          props.change(false);
          props.deleted(true);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: '300px',
        }}
      >
        <Grid item xs={2}>
          <Card
            className="card-content"
            style={{
              borderRadius: '15px',
              boxShadow: '3px 5px 30px -10px rgba(0,0,0,0.50)',
              marginLeft: '0px',
              marginBottom: '0px',
            }}
          >
            <div className="">{props.message}</div>
            <Box
              style={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
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
                    Deleting
                  </LoadingButton>
                ) : (
                  <Button
                    onClick={() => deleteProgram()}
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
                    Delete{' '}
                  </Button>
                )}
              </div>
              <div>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: '14px',
                    padding: '8px 40px',
                    color: '#542A52',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    borderColor: '#542A52',
                    '&:hover': {
                      borderColor: '#6D3D6D',
                    },
                  }}
                  onClick={() => props.change(false)}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
