import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState, useContext } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import axios from 'axios';
import { FloorContext } from 'src/pages/DashboardApp';
import FloorPlan from './FloorPlan';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Accordian(props) {
  console.log(props);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const floor = useContext(FloorContext);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/floors/singleFloor?floor_id=${props.floor.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        setLoading(false);
        setSlots(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{`Floor ${props.floor.id}`}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{`${props.floor.no_of_slots} slots`}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#c8c9cb' }}>
          <Typography>| Entrance |</Typography>
          <FloorPlan />

          <Stack spacing={1} alignItems="flex-end">
            <Stack direction="row" spacing={1}>
              <Chip label="Available" color="success" />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Chip label="Occupied" color="error" />
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
