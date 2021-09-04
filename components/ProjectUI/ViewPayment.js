import React, { useState, useEffect } from 'react';
import { getPaymentDetails } from '../../utils/apiCalls/payments';
import Lightbox from '../UI/Lightbox';
import TextButton from '../UI/TextButton';
import PaymentDetails from './ViewPaymentComponents/PaymentDetails';
import { useReactToPrint } from 'react-to-print';

const ViewPayment = ({ label = 'View payment', paymentID, receiptNo }) => {
	const [showLB, setShowLB] = useState(false);
	const [data, setData] = useState(null);
	const toggleLB = () => setShowLB(!showLB);

	/**
	 * GET THE PAYMENT DETAILS
	 */
	const showPayment = async param => {
		try {
			toggleLB();
			if (!data) {
				const paymentDetails = await getPaymentDetails(paymentID);
				setData(paymentDetails);
			}
		} catch (e) {}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='ViewPayment'>
			<TextButton onClick={showPayment}>{label}</TextButton>

			{/* LB */}
			<Lightbox autoHeight title={`Payment ${receiptNo ? `#${receiptNo}` : 'details'}`} show={showLB} toggle={toggleLB}>
				{data ? <PaymentDetails {...data} /> : 'Loading...'}
			</Lightbox>
		</div>
	);
};

export default ViewPayment;
