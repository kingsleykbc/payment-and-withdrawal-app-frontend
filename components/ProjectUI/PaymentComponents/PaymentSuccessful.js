import React from 'react';
import ResultPage from '../../UI/ResultPage';

const PaymentSuccessful = ({ closePayment }) => {
	return (
		<ResultPage
			type='success'
			title='Payment successful!'
			subTitle='Your payment has been successfully processed!'
			onDefaultBottomButtonClick={closePayment}
			defaultBottomButtonLabel='Continue'
			vPadding='25px'
		/>
	);
};

export default PaymentSuccessful;
