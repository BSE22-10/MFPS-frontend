import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import axios from 'axios';

export default function Accordian(props) {
  //   console.log(props);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(props.id);
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
        // console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {slots.map((slot) => {
        {
          if (loading) {
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>;
          } else {
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ width: '33%', flexShrink: 0 }}>{`Floor ${props.floor.id}`}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{`${props.floor.no_of_slots} slots`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
                  dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>;
          }
        }
      })}
    </div>
  );
}
