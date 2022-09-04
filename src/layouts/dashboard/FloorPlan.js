import React from 'react';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { FloorContext } from 'src/pages/DashboardApp';
import SlotCard from './SlotCard';
import { Grid, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function FloorPlan(props) {
  const floor = useContext(FloorContext);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  // const [occupied, setOccupuied] = useState(0);
  // const [available, setAvailable] = useState(0);
  var count = 0;
  var occupied = 0,
    available = 0;
  useEffect(() => {
    setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    setLoading(true);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/floors/singleFloor?floor_id=${floor}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        console.log('Here');
        setSlots(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [timeLeft]);
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
        {slots.map((slot) => {
          count += 1;
          // console.log(slot.SlotStatus[0] === undefined);
          // console.log(slot.SlotStatus[0]);
          const status = slot.SlotStatus.length === 0 || slot.SlotStatus[0].status === false ? false : true;
          // if (status === true) {
          //   setAvailable((available) => available + 1);
          // } else {
          //   setOccupuied((occupied) => occupied + 1);
          // }
          if (status === true) {
            occupied += 1;
          } else {
            available += 1;
          }
          // console.log(status);
          return (
            <Grid item xs={6} sm={2} key={slot.id}>
              <SlotCard slot={slot} count={count} />
            </Grid>
          );
        })}
      </Grid>
      <Stack spacing={1} alignItems="flex-end">
        <Stack direction="row" spacing={1}>
          <Chip label="Available" color="success" />
          <Typography>{available}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip label="Occupied" color="error" />
          <Typography>{occupied}</Typography>
        </Stack>
      </Stack>
    </div>
  );
}

export default FloorPlan;
