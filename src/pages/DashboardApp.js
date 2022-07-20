import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import BeatLoader from 'react-spinners/BeatLoader';
// components
import { useEffect, useState } from 'react';
import axios from 'axios';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  NewBarChart,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
var categories = [];
var series = [];

// const [setCategory, category] = useState();
// const [setSeries, series] = useState();
export default function DashboardApp() {
  const [floorData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(process.env.REACT_APP_API_URL);
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

        console.log(result);
        result.data.map((info) => {
          categories.push(info.floor_id);
          // setCategory(info.categories);
          series.push(info.count);
          return true;
        });
        console.log(categories);
        const stuff = {
          options: {
            chart: {
              id: 'basic-bar',
            },
            xaxis: {
              categories: categories,
            },
          },
          series: [
            {
              name: 'No. of cars',
              data: series,
            },
          ],
        };
        setData(stuff);
      })
      .catch((error) => {
        console.log(error);
        // setError(error.response.data);
      });
  }, []);

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
              <AppWidgetSummary title="Daily" total={714000} icon={'bi:calendar-day'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={4}>
              <AppWidgetSummary title="Weekly" total={1352831} color="info" icon={'bi:calendar-week'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={4}>
              <AppWidgetSummary title="Monthly" total={1723315} color="warning" icon={'bi:calendar-month'} />
            </Grid>
            <div>
              <NewBarChart />
            </div>
            <Grid item xs={12} md={12} lg={12}>
              <AppWebsiteVisits
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
                chartinfo={floorData}
              />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
      <AppCurrentVisits
        title="Current Visits"
        chartData={[
          { label: 'America', value: 4344 },
          { label: 'Asia', value: 5435 },
          { label: 'Europe', value: 1443 },
          { label: 'Africa', value: 4443 },
        ]}
        chartColors={[
          theme.palette.primary.main,
          theme.palette.chart.blue[0],
          theme.palette.chart.violet[0],
          theme.palette.chart.yellow[0],
        ]}
      />
    </Grid> */}

            <Grid item xs={12} md={12} lg={12}>
              <AppConversionRates
                title="Conversion Rates"
                subheader="(+43%) than last year"
                chartData={[
                  { label: 'Italy', value: 400 },
                  { label: 'Japan', value: 430 },
                  { label: 'China', value: 448 },
                  { label: 'Canada', value: 470 },
                  { label: 'France', value: 540 },
                  { label: 'Germany', value: 580 },
                  { label: 'South Korea', value: 690 },
                  { label: 'Netherlands', value: 1100 },
                  { label: 'United States', value: 1200 },
                  { label: 'United Kingdom', value: 1380 },
                ]}
              />
            </Grid>
            {/* 
    <Grid item xs={12} md={6} lg={4}>
      <AppCurrentSubject
        title="Current Subject"
        chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
        chartData={[
          { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
          { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
          { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
        ]}
        chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
      />
    </Grid> */}
          </Grid>
        </Container>
      )}
    </Page>
  );
}
