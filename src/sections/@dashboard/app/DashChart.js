import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
// import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------

var categories = [];
var series = [];
var chartOptions;
var chartSeries;
DashChart.propTypes = {
  title: PropTypes.string,
  // subheader: PropTypes.string,
  // chartData: PropTypes.array.isRequired,
  // chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartinfo: PropTypes.object,
  charttype: PropTypes.string,
  // timely: PropTypes.bool,
};

export default function DashChart({
  title,
  subheader,
  chartLabels,
  chartData,
  chartinfo,
  charttype,
  timely,
  duration,
  ...other
}) {
  chartOptions = chartinfo.options;
  chartSeries = chartinfo.series;
  // const [categories, setCategories] = useState();
  const [timelyData, setTimelyDate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [serie, setSerie] = useState([]);
  const isMounted = useRef(false);
  if (timely === 'true') {
    useEffect(() => {
      setLoading(true);
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/slots/timelyData?duration=${duration}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => {
          setLoading(false);
          result.data.map((info) => {
            categories.push(info.time);
            setCategory((category) => [...category, info.time]);
            setSerie((serie) => [...serie, info.count]);
            // setCategory(info.categories);
            // setCategory((category) => {
            //   category.push(info.floor_id);
            // });
            series.push(info.count);
            return true;
          });
        })
        .catch((error) => {
          console.log(error);
          // setError(error.response.data);
        });
    }, []);
    const items2 = {
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
          name: 'Daily activity',
          data: serie,
        },
      ],
    };
    chartOptions = items2.options;
    chartSeries = items2.series;
  }

  // setCategories(chartinfo.options.xaxis.categories.categories);
  // console.log(other);
  return (
    <div>
      {loading === true && timely === 'true' ? (
        <div className="loading">
          <BeatLoader
            color="#542A52"
            loading={loading}
            // css={override}
            size={40}
          />
        </div>
      ) : (
        <Card {...other}>
          <CardHeader title={title} subheader={subheader} />

          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            {/* <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} /> */}
            <Chart options={chartOptions} series={chartSeries} type={charttype} width="100%" height="364" />
          </Box>
        </Card>
      )}
    </div>
  );
}
