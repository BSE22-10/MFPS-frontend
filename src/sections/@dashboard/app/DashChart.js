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

DashChart.propTypes = {
  title: PropTypes.string,
  // subheader: PropTypes.string,
  // chartData: PropTypes.array.isRequired,
  // chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartinfo: PropTypes.object,
  charttype: PropTypes.string,
};

export default function DashChart({ title, subheader, chartLabels, chartData, chartinfo, charttype, ...other }) {
  console.log(chartinfo);
  const [categories, setCategories] = useState();
  // setCategories(chartinfo.options.xaxis.categories.categories);
  // console.log(other);

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {/* <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} /> */}
        <Chart options={chartinfo.options} series={chartinfo.series} type={charttype} width="100%" height="364" />
      </Box>
    </Card>
  );
}
