import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios';
import { DOMAIN } from '../utils/config';

const payment = props => {
	const [reference, setReference] = useState('REF_' + new Date().getTime());
  const [paymentMethods, setPaymentMethods] = useState([]);

	const config = {
		email: 'user@example.com',
		amount: 20000,
		publicKey: props.TEST_PUBLIC_KEY
	};

  useEffect(() => {
    
  }, []);

	const initializePayment = usePaystackPayment({ reference, ...config });

	const onSuccess = reference => {
		setReference('REF_' + new Date().getTime());
		console.log(reference);
	};

	const onClose = () => {
		console.log('closed');
	};

	return (
		<Layout>
			<button onClick={() => initializePayment(onSuccess, onClose)}> PAY </button>
		</Layout>
	);
};

payment.getInitialProps = async ctx => {
	return {
		TEST_SECRET_KEY: process.env.TEST_SECRET_KEY,
		TEST_PUBLIC_KEY: process.env.TEST_PUBLIC_KEY
	};
};

export default payment;
