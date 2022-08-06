import React from 'react';
import './registerPayments.css';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { Card, Grid, Box } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { TextField1 } from '../microComponents/TextField';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

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

function HomePayment() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const validationSchema = yup.object({});
  return (
    <div>
      <Formik
        initialValues={{
          numberPlate: '',
          phoneNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {}}
      >
        {({ values, handleSubmit, errors, isValidating, isSubmitting, touched }) => (
          <form className="form-wrap" onSubmit={handleSubmit} method="POST">
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ margin: '50px auto' }}
            >
              <Grid item xs={12}>
                <Card
                  className="card-content"
                  style={{
                    borderRadius: '15px',
                    boxShadow: '3px 5px 30px -10px rgba(0,0,0,0.50)',
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      Item Three
                    </TabPanel>
                  </Box>

                  <h1>Register vehicle</h1>
                  <br />
                  {/* <form onSubmit={handleSubmit} method="POST"> */}
                  <div className="formGrid">
                    <div>
                      <label htmlFor="firstname">
                        Number Plate<span className="asterisks">*</span>
                      </label>
                      <br />
                      <TextField1
                        name="firstName"
                        placeholder="e.g. UAZ SDFSY"
                        type="input"
                        size="small"
                        sx={{
                          marginTop: '5px',
                        }}
                        // error={formError}
                      />
                    </div>

                    <div>
                      <div>
                        <label htmlFor="phoneNumber">
                          Phone number<span className="asterisks">*</span>
                        </label>
                      </div>
                      <TextField1
                        name="district"
                        placeholder="e.g. Kampala"
                        type="input"
                        size="small"
                        sx={{
                          marginTop: '5px',
                        }}
                      />
                    </div>
                  </div>
                  <div className="btn">
                    <div>
                      <button className="btnNext" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </Card>
              </Grid>
              <p className="Instructions">
                Fields with <span>*</span> are required fields{' '}
              </p>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default HomePayment;
