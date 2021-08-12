import React, { useRef } from 'react';
import AreYouSureBox from '../UI/AreYouSureBox';
import Snackbar from '../UI/Snackbar';
import NewPaystackPayment from './PaymentComponents/NewPaystackPayment';
import PreviousPayments from './PaymentComponents/PreviousPayments';

const Payment = ({
	charge = true,
	keys = {},
	amount,
	onPay,
	onError,
	authContext: {
		refreshUserData,
		userData: { email, paymentMethods }
	}
}) => {
	const areYouSureRef = useRef(null);
	const snackbarRef = useRef(null);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Payment'>
			<h2>Pay ₦{amount}</h2>

			{/* PAY WITH NEW DETAILS (PAYSTACK) */}
			<NewPaystackPayment
				amount={amount}
				email={email}
				onPay={onPay}
				onError={onError}
				hasPreviousPaymentMethods={paymentMethods.length > 0}
				keys={keys}
				refreshUserData={refreshUserData}
				snackbarRef={snackbarRef}
			/>

			{/* PAY WITH PREVIOUS/SAVED PAYMENT DETAILS */}
			{paymentMethods.length > 0 && (
				<PreviousPayments
					amount={amount}
					charge={charge}
					onPay={onPay}
					onError={onError}
					paymentMethods={paymentMethods}
					refreshUserData={refreshUserData}
					areYouSureRef={areYouSureRef}
					snackbarRef={snackbarRef}
				/>
			)}

			<AreYouSureBox ref={areYouSureRef} />
			<Snackbar ref={snackbarRef} />
		</div>
	);
};

export default Payment;
