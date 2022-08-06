import React from 'react';
import './registerPayments.css';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { Card, Grid } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { TextField1 } from '../microComponents/TextField';

function RegisterPayment() {
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

export default RegisterPayment;
