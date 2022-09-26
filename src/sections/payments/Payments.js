import React from 'react';
import { useFlutterwave, FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import './registerPayments.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { SummaryContext } from './homePage';

function Payments(props) {
  // console.log(props.value);
  const { setPaymentSuccess, handleClose } = useContext(SummaryContext);
  const [userEmail, setEmail] = useState('');
  const getEmail = (plate) => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/accounts/getEmail`,
      data: {
        number_plate: `${plate}`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        if (data.status == 200) {
          setEmail(data.data.email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateAccount = (plate, amount) => {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/accounts/updatePayment`,
      data: {
        number_plate: plate,
        amount: amount,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          console.log('successfull update');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var disabled = props.disabled;
  const { numberPlate, email, amount } = props.value;
  console.log(numberPlate);
  var register = props.register;
  {
    register == false && getEmail(props.value.numberPlate);
  }
  const config = {
    public_key: 'FLWPUBK_TEST-fd554ed0ef13c68ce40d28394cba5c1f-X',
    tx_ref: Date.now(),
    amount: props.value.amount,
    currency: 'UGX',
    payment_options: 'card,mobilemoneyuganda,ussd',
    customer: {
      name: props.value.numberPlate,
      email: register ? props.value.email : userEmail,
      phonenumber: '0771419370',
    },
    customizations: {
      title: 'Parking',
      description: 'Payment parking',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
    meta: {
      numberPlate: props.value.numberPlate,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  function createAccount() {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/accounts`,
      data: {
        number_plate: numberPlate,
        email: email,
        amount: 0,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          handleFlutterPayment({
            callback: (response) => {
              setPaymentSuccess(true);
              handleClose(false);
              var plate = response.customer.name.split(' ');
              // console.log(plate.at(-1));
              // console.log(response.customer.name.split(' '));
              console.log(response.customer.name);
              console.log(response.customer.name.split(' ').slice(0, -1).join(' '));
              updateAccount(response.customer.name, response.amount);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function topUp() {
    console.log('Here we are');
    handleFlutterPayment({
      callback: (response) => {
        setPaymentSuccess(true);
        handleClose(false);
        var plate = response.customer.name.split(' ');
        console.log(response.customer.name);
        console.log(response.customer.name.split(' ').slice(0, -1).join(' '));
        updateAccount(response.customer.name, response.amount);
        closePaymentModal();
      },
      onClose: () => {},
    });
  }

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response.meta);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  return (
    <div className="App">
      {/* <FlutterWaveButton {...fwConfig} /> */}
      <button
        // disabled={!disabled}
        onClick={() => {
          console.log('Yap');
          // handleFlutterPayment({
          //   callback: (response) => {
          //     console.log(response.meta);
          //     closePaymentModal(); // this will close the modal programmatically
          //   },
          //   onClose: () => {},
          // });
          {
            register ? createAccount() : topUp();
          }
        }}
        className="btnNext"
      >
        {register ? 'REGISTER' : 'TOP UP'}
      </button>
    </div>
  );
}

export default Payments;
