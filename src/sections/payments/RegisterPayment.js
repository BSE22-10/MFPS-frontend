import React from 'react';
import './registerPayments.css';
import { Formik, useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Card, Grid, Box } from '@mui/material';
import * as yup from 'yup';
import { TextField1 } from '../microComponents/TextField';
import SelectField from '../microComponents/SelectField';
import Payments from './Payments';
import { useFlutterwave, FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

function RegisterPayment() {
  const [firstTime, setFirstTime] = useState(false);
  const phone_regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  const options = [
    { value: '--Choose--', label: '--Choose--' },
    { value: 'First time', label: 'First time' },
    { value: 'Top up', label: 'Top up' },
  ];

  //   const config = {
  //     public_key: 'FLWPUBK_TEST-fd554ed0ef13c68ce40d28394cba5c1f-X',
  //     tx_ref: Date.now(),
  //     amount: props.value.amount,
  //     currency: 'UGX',
  //     payment_options: 'card,mobilemoneyuganda,ussd',
  //     customer: {
  //       email: 'user@gmail.com',
  //       phonenumber: '0771419370',
  //       number_plate: props.value.numberPlate,
  //     },
  //     customizations: {
  //       title: 'My store',
  //       description: 'Payment for items in cart',
  //       logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  //     },
  //   };

  //   const handleFlutterPayment = useFlutterwave(config);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [setVehicle, vehicle] = useState([]);

  function validateSelect(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value === options[0].value) {
      setFirstTime(true);
      error = 'Please select';
    } else if (value === 'Top up') {
      setFirstTime(false);
    } else {
      setFirstTime(true);
      error = '';
    }
    return error;
  }
  //   const formik = useFormik;
  const validationSchema = yup.object({
    numberPlate: yup.string().required('Field is required'),
    phoneNumber: yup.string().required('Field is required').matches(phone_regex, 'Enter a valid phone number'),
    amount: yup
      .number('Provide a number')
      .required('Field is required')
      .min(20, 'Minimum is 20')
      .max(30, 'Maximum is 30'),
  });
  return (
    <div>
      <Formik
        initialValues={{
          numberPlate: '',
          phoneNumber: '',
          amount: 0,
          mode: options[0].value,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          const config = {
            public_key: 'FLWPUBK_TEST-fd554ed0ef13c68ce40d28394cba5c1f-X',
            tx_ref: Date.now(),
            amount: values.amount,
            currency: 'UGX',
            payment_options: 'card,mobilemoneyuganda,ussd',
            customer: {
              email: 'user@gmail.com',
              phonenumber: values.phoneNumber,
              number_plate: values.numberPlate,
            },
            customizations: {
              title: 'My store',
              description: 'Payment for items in cart',
              logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
            },
          };

          const handleFlutterPayment = useFlutterwave(config);

          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
          setApplicantData({ ...values });
        }}
      >
        {({ values, handleSubmit, errors, isValidating, isSubmitting, touched, isValid }) => (
          <form className="form-wrap" onSubmit={handleSubmit} method="POST">
            <Grid item xs={12}>
              <h1>Payment</h1>
              <br />
              {/* <form onSubmit={handleSubmit} method="POST"> */}
              <div className="formGrid">
                <div>
                  <div>
                    <label htmlFor="gender">
                      Top up/ first time<span className="asterisks">*</span>
                    </label>
                  </div>
                  <SelectField
                    name="mode"
                    validate={validateSelect}
                    fullWidth
                    size="small"
                    sx={{
                      marginTop: '5px',
                    }}
                    MenuItems={options}
                  />
                </div>
                <div>
                  <label htmlFor="firstname">
                    Number Plate<span className="asterisks">*</span>
                  </label>
                  <br />
                  <TextField1
                    name="numberPlate"
                    placeholder="e.g. UAZ SDFSY"
                    type="input"
                    size="small"
                    sx={{
                      marginTop: '5px',
                    }}
                    // error={formError}
                  />
                </div>
                {firstTime && (
                  <div>
                    <div>
                      <label htmlFor="phoneNumber">
                        Phone number (for notifications)<span className="asterisks">*</span>
                      </label>
                    </div>
                    <TextField1
                      name="phoneNumber"
                      placeholder="e.g. 0771419370"
                      type="input"
                      size="small"
                      sx={{
                        marginTop: '5px',
                      }}
                    />
                  </div>
                )}

                <div>
                  <div>
                    <label htmlFor="phoneNumber">
                      Amount (300 to 500) UGX<span className="asterisks">*</span>
                    </label>
                  </div>
                  <TextField1
                    name="amount"
                    placeholder="1"
                    type="number"
                    size="small"
                    inputProps={1}
                    sx={{
                      marginTop: '5px',
                    }}
                  />
                </div>
              </div>
              <div className="btn">
                <div>
                  {/* <button className="btnNext" type="submit"> */}
                  {/* <Payments value={values} disabled={isValid} /> */}
                  {/* </button> */}
                  <button className="btnNext" type="submit">
                    SUBMIT
                  </button>
                </div>
              </div>
            </Grid>
            <p className="Instructions">
              Fields with <span>*</span> are required fields{' '}
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPayment;
