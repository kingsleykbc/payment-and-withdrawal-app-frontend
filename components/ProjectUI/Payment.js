import React, { useRef } from 'react';
import AreYouSureBox from '../UI/AreYouSureBox';
import PageDivider from '../UI/PageDivider';
import Price from '../UI/Price';
import Snackbar from '../UI/Snackbar';
import NewPaystackPayment from './PaymentComponents/NewPaystackPayment';
import PreviousPayments from './PaymentComponents/PreviousPayments';

const Payment = ({
	keys = {},
	amount,
	onPay,
	onError,
	authContext,
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
			<h2>
				Pay <Price showSymbol price={amount} inline />
			</h2>

			{/* PAY WITH PREVIOUS/SAVED PAYMENT DETAILS */}
			{paymentMethods.length > 0 && (
				<>
					<PreviousPayments
						amount={amount}
						charge={true}
						onPay={onPay}
						onError={onError}
						authContext={authContext}
						areYouSureRef={areYouSureRef}
						snackbarRef={snackbarRef}
					/>
					<PageDivider>OR</PageDivider>
				</>
			)}

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

			<AreYouSureBox ref={areYouSureRef} />
			<Snackbar ref={snackbarRef} />
		</div>
	);
};

export default Payment;
