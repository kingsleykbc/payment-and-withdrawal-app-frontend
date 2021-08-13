import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import Payment from '../components/ProjectUI/Payment';
import { AuthContext } from '../contexts/AuthContext';
import Spacing from '../components/UI/Spacing';
import { createOrder } from '../utils/apiCalls/orders';

const payment = ({ secretKey, publicKey }) => {
	const authContext = useContext(AuthContext);
	const [payment, setPayment] = useState(null);

	/**
	 * HANDLE PAYMENT
	 */
	const handlePayment = async payment => {
		const order = await createOrder(payment);
		setPayment(order);
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<Layout>
			{authContext.isAuthenticated ? (
				<Payment onPay={handlePayment} authContext={authContext} amount={3000} keys={{ secretKey, publicKey }} />
			) : (
				<>
					<h1>Welcome to the site</h1>
					<Spacing padding='20px 0'>Login to use the payment site.</Spacing>
				</>
			)}
			{payment && <pre>{JSON.stringify(payment, null, 2)}</pre>}
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
