import { useState, useEffect } from 'react';

const setChartData = (category, serie, title, seriesName) => {
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
            text: title,
            // style: {
            //   color: '#FF1654',
            // },
          },
        },
      ],
    },
    series: [
      {
        name: seriesName,
        data: serie,
      },
    ],
  };

  return stuff;
};

export default setChartData;
