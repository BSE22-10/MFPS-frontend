import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { FloorContext } from 'src/pages/DashboardApp';
import SlotCard from './SlotCard';
import Searchbar from './Searchbar';
import BeatLoader from 'react-spinners/BeatLoader';
import { Grid } from '@mui/material';

function FloorPlan(props) {
  const floor = useContext(FloorContext);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  var count = 0;
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/floors/singleFloor?floor_id=${floor}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        setLoading(false);
        setSlots(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Grid
        container
        // display="flex"
        maxWidth="100%"
        alignItems="center"
        // direction="column"
        // justify="flex-end"
        // style={{margin:'50px auto'}}
        spacing={2}
      >
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
          slots.map((slot) => {
            count += 1;
            // console.log(slot.SlotStatus[0]);
            return (
              <Grid item xs={6} sm={2} key={slot.id}>
                <SlotCard slot={slot} count={count} />
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}

export default FloorPlan;
