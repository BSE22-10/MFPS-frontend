import { faker } from '@faker-js/faker';
// @mui
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import BeatLoader from 'react-spinners/BeatLoader';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// components
import { useEffect, useState, useRef, createContext } from 'react';
import axios from 'axios';
import Page from '../components/Page';
import Accordian from 'src/layouts/dashboard/Accordian';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  DashChart,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  NewBarChart,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
var categories = [];
var series = [];
var check = false;
export const FloorContext = createContext();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const [setCategory, category] = useState();
// const [setSeries, series] = useState();
export default function DashboardApp() {
  const isMounted = useRef(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [floorData, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [floors, setFloors] = useState([]);
  const [serie, setSerie] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/slots/parkingSlots`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        setLoading(false);
        result.data.map((info) => {
          categories.push(info.floor_id);
          // setCategory(info.categories);
          setCategory((category) => [...category, info.floor_id]);
          // setCategory(info.floor_id);
          series.push(info.count);
          setSerie((serie) => [...serie, info.count]);
          return true;
        });
        console.log(category);
      })
      .catch((error) => {
        console.log(error);
        // setError(error.response.data);
      });
  }, []);

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

  const stuff = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: category,
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: 'inherit',
          },
          // labels: {
          //   style: {
          //     colors: '#FF1654',
          //   },
          // },
          title: {
            text: 'Number of cars',
            // style: {
            //   color: '#FF1654',
            // },
          },
        },
      ],
    },
    series: [
      {
        name: 'No. of cars',
        data: serie,
      },
    ],
  };
  // setData(stuff);
  console.log(stuff);
  const theme = useTheme();

  return (
    <Page title="Dashboard">
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
            <Grid item xs={12} sm={6} md={3} lg={4}>
              <AppWidgetSummary title="Daily" total={10} color="primary" icon={'bi:calendar-day'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={4}>
              <AppWidgetSummary title="Weekly" total={12} color="success" icon={'bi:calendar-week'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={4}>
              <AppWidgetSummary title="Monthly" total={15} color="warning" icon={'bi:calendar-month'} />
            </Grid>
            <div>
              <NewBarChart />
            </div>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h4">Floor plan</Typography>
              {/* <DashChart
                title="Number of cars on each floor"
                chartLabels={[
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ]}
                chartData={[
                  {
                    name: 'Team A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Team B',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Team C',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
                chartinfo={stuff}
                charttype={'bar'}
                timely={'false'}
              /> */}
              {floors.map((floor) => {
                console.log(floor);
                return (
                  <FloorContext.Provider value={floor.id}>
                    <Accordian floor={floor} id={floor.id} key={floor.id} />
                    <br />
                  </FloorContext.Provider>
                );
              })}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Daily" {...a11yProps(0)} />
                    <Tab label="Weekly" {...a11yProps(1)} />
                    <Tab label="Monthly" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <DashChart
                    title="Number of cars received daily"
                    chartinfo={stuff}
                    charttype={'line'}
                    timely={'true'}
                    duration={'daily'}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <DashChart
                    title="Number of cars received weekly"
                    chartinfo={stuff}
                    charttype={'line'}
                    timely={'true'}
                    duration={'weekly'}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <DashChart
                    title="Number of cars received monthly"
                    chartinfo={stuff}
                    charttype={'line'}
                    timely={'true'}
                    duration={'monthly'}
                  />
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
