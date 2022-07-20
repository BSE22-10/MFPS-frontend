import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------
const [floorData, setData] = useState([]);
const [loading, setLoading] = useState();
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
      const categories = [];
      const series = [];
      console.log(result);
      result.data.map((info) => {
        console.log(info);
        categories.push(info.floor_id);
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
            categories: { categories },
          },
        },
        series: [
          {
            name: 'series-1',
            data: { series },
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

const stuff = {
  options: {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
  // console.log(other);
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {/* <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} /> */}
        <Chart options={floorData.options} series={floorData.series} type="bar" width="100%" height="364" />
      </Box>
    </Card>
  );
}
