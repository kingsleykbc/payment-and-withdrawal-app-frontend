import React from 'react';
import Layout from '../components/Layout';
import Payment from '../components/ProjectUI/Payment';

const payment = ({ secretKey, publicKey }) => {
	return (
		<Layout>
			<Payment keys={{ secretKey, publicKey }} />
		</Layout>
	);
};

payment.getInitialProps = async ctx => {
	return {
		secretKey: process.env.TEST_SECRET_KEY,
		publicKey: process.env.TEST_PUBLIC_KEY
	};
};

export default payment;
