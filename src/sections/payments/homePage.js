import React from 'react';
import './registerPayments.css';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { Card, Grid, Box, Modal } from '@mui/material';
import * as yup from 'yup';
import axios from 'axios';
import { TextField1 } from '../microComponents/TextField';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import RegisterPayment from './RegisterPayment';
import { useFlutterwave, FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import SelectField from '../microComponents/SelectField';
import Payments from './Payments';
import { createContext } from 'react';
import Summary from './Summary';

export const summaryContext = createContext();
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

async function createAccount() {
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/accounts`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function HomePayment() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [firstTime, setFirstTime] = useState(false);
  const [vehicle, setVehicle] = useState([]);
  const [plateError, setPlateError] = useState(true);
  const [firstTimeplateError, setfirstTimePlateError] = useState(true);
  const [viewSummary, setViewSummary] = useState(false);
  async function checkNumberPlate(plate) {
    console.log(plate);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/accounts/checkPlate`,
      data: {
        number_plate: plate,
      },
    })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setPlateError(true);
          setfirstTimePlateError(true);
          if (firstTime === true) {
            console.log('First time');
            setfirstTimePlateError(false);
          }
        }
      })
      .catch((error) => {
        if (firstTime === false) {
          setPlateError(false);
          setfirstTimePlateError(true);
        }
      });
  }
  const phone_regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  const options = [
    { value: '--Choose--', label: '--Choose--' },
    { value: 'First time', label: 'First time' },
    { value: 'Top up', label: 'Top up' },
  ];
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: 450, //0
      sm: 600, // 600
      md: 700, // 900
      lg: 800, // 1200
      xl: 1000, // 1536
    },
    display: 'flex',
    flexDirection: 'column',
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 0,
    marginTop: 1,
  };
  //Validating select fields
  function validateSelect(value) {
    console.log(value);
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
  // Validation schema for forms
  const validationSchema = yup.object({
    numberPlate: yup
      .string()
      .test('Checking the number plate', 'Number plate does not exist', async (value) => {
        await checkNumberPlate(value);
        return plateError;
      })
      .test('Checking if plate is registered', 'Number plate registered', async (value) => {
        await checkNumberPlate(value);
        return firstTimeplateError;
      })
      // .length(2, 'Provide more values')
      .required('Field is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      // .required('This field is required', () => {
      //   console.log('required');
      //   return false;
      // }),
      .test('Top up exclusion', 'Required', (value) => {
        if (firstTime && value == undefined) {
          return false;
        }
        return true;
      }),
    // phoneNumber: yup.string().required('Field is required').matches(phone_regex, 'Enter a valid phone number'),
    amount: yup
      .number('Provide a number')
      .required('Field is required')
      .min(20, 'Minimum is 20')
      .max(30, 'Maximum is 30'),
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} flexGrow={1}>
          <Summary close={handleClose} values={vehicle} register={firstTime} />
        </Box>
      </Modal>
      <Formik
        initialValues={{
          numberPlate: '',
          // phoneNumber: '',
          email: '',
          amount: 0,
          mode: options[0].value,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setViewSummary(true);
          setVehicle({ ...values });
          console.log(vehicle);
          handleOpen();
        }}
      >
        {({ values, handleSubmit, errors, isValidating, isSubmitting, touched, isValid }) => (
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
                            <label htmlFor="email">
                              Email (for notifications)<span className="asterisks">*</span>
                            </label>
                          </div>
                          <TextField1
                            name="email"
                            placeholder="e.g. odeke@gmail.com"
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
                        {/* <Payments value={values} disabled={isValid} register={firstTime} /> */}
                        {/* </button> */}
                        <button className="btnNext" type="submit">
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </Grid>
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
