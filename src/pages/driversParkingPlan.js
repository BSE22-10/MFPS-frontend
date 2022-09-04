import React from 'react';
import { useEffect, useState, useRef, createContext } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import Accordian from 'src/layouts/dashboard/Accordian';
import axios from 'axios';
import Page from '../components/Page';
import BeatLoader from 'react-spinners/BeatLoader';
export const DriverFloorContext = createContext();
function DriversParkingPlan() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/floors`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        setLoading(false);
        setFloors(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Page title="Driver map">
      {loading ? (
        <div className="loading">
          <BeatLoader
            color="#542A52"
            loading={loading}
            // css={override}
            size={40}
          />
        </div>
      ) : (
        <Container maxWidth="xl">
          {/* <Typography variant="h4" sx={{ mb: 5 }}>
  Hi, Welcome back
</Typography> */}

          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h4">Floor plan</Typography>
              {floors.map((floor) => {
                return (
                  <DriverFloorContext.Provider value={floor.id}>
                    <Accordian floor={floor} id={floor.id} key={floor.id} name="drivers" />
                    <br />
                  </DriverFloorContext.Provider>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  );
}

export default DriversParkingPlan;
