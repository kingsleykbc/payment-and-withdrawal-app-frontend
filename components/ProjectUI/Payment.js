import React, { useRef, useState } from 'react';
import AreYouSureBox from '../UI/AreYouSureBox';
import PageDivider from '../UI/PageDivider';
import Price from '../UI/Price';
import Snackbar from '../UI/Snackbar';
import NewPaystackPayment from './PaymentComponents/NewPaystackPayment';
import PaymentSuccessful from './PaymentComponents/PaymentSuccessful';
import PreviousPayments from './PaymentComponents/PreviousPayments';

const Payment = ({
	keys = {},
	amount,
	onPay,
	onError,
	authContext,
	unmountedAfterUse,
	onClose,
	authContext: {
		refreshUserData,
		userData: { email, paymentMethods }
	}
}) => {
	const [view, setView] = useState('Pay');
	const areYouSureRef = useRef(null);
	const snackbarRef = useRef(null);

	/**
	 * HANDLE PAYMENT COMPLETE
	 */
	const handlePaymentComplete = data => {
		if (onPay) onPay(data);
		if (!unmountedAfterUse) {
			snackbarRef.current.openSnackbar({ type: 'success', message: 'Payment successful' });
			setView('PaymentSuccessful');
		}
	};

	/**
	 * CLOSE THE PAYMENT BOX (FOR WHEN COMPONENT NOT UNMOUNTED)
	 */
	const closePayment = () => {
		setView('Pay');
		if (onClose) onClose();
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Payment'>
			<h2>
				Pay <Price showSymbol price={amount} inline />
			</h2>
			{view === 'Pay' && (
				<>
					{/* PAY WITH PREVIOUS/SAVED PAYMENT DETAILS */}
					{paymentMethods.length > 0 && (
						<>
							<PreviousPayments
								amount={amount}
								charge={true}
								onPay={handlePaymentComplete}
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
						onPay={handlePaymentComplete}
						onError={onError}
						hasPreviousPaymentMethods={paymentMethods.length > 0}
						keys={keys}
						refreshUserData={refreshUserData}
						snackbarRef={snackbarRef}
					/>{' '}
				</>
			)}

			{view === 'PaymentSuccessful' && <PaymentSuccessful closePayment={closePayment} />}

			<AreYouSureBox ref={areYouSureRef} />
			<Snackbar ref={snackbarRef} />
		</div>
	);
};

export default Payment;
