import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

function Payments() {
  const config = {
    public_key: 'FLWPUBK_TEST-fd554ed0ef13c68ce40d28394cba5c1f-X',
    tx_ref: Date.now(),
    amount: 2,
    currency: 'UGX',
    payment_options: 'card,mobilemoneyuganda,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '0771419370',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };
  return (
    <div className="App">
      <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}

export default Payments;
