import React, { useState } from 'react';
import { deletePaymentMethod } from '../../../utils/apiCalls/paymentMethods';
import PageDivider from '../../UI/PageDivider';
import PaymentMethod from './PreviousPaymentsComponents/PaymentMethod';
import { Par } from '../../UI/TextComponents';
import Spacing from '../../UI/Spacing';
import { chargePreviousPayment } from '../../../utils/apiCalls/payments';
import { getError } from '../../../utils/functions';
import Button from '../../UI/Button';

const PreviousPayments = ({
	authContext: {
		userData: { paymentMethods },
		refreshUserData
	},
	charge,
	onPay,
	onError,
	areYouSureRef,
	amount,
	snackbarRef
}) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * LIST PAYMENT METHODS
	 */
	const paymentMethodsWidgets = paymentMethods.map(({ _id, category, details }, ind) => {
		const isSelected = _id === (selectedPaymentMethod && selectedPaymentMethod._id);
		const removeFunc = async () => {
			await deletePaymentMethod(_id);
			await refreshUserData();
			if (isSelected) setSelectedPaymentMethod(null);
			snackbarRef.current.openSnackbar({ type: 'error', message: 'Payment method removed' });
		};
		const selectFunc = () => setSelectedPaymentMethod(paymentMethods[ind]);

		return (
			<PaymentMethod
				category={category}
				charge={charge}
				key={_id}
				isSelected={isSelected}
				onSelect={selectFunc}
				onRemove={removeFunc}
				data={details}
			/>
		);
	});

	/**
	 * MAKE PAYMENT
	 */
	const makePayment = async () => {
		setIsLoading(true);
		try {
			const payment = await chargePreviousPayment(amount, selectedPaymentMethod._id);
			onPay(payment);
			snackbarRef.current.openSnackbar({ type: 'success', message: 'Payment successful' });
		} catch (e) {
			const { message } = getError(e);
			setError(message);
			onError(message);
		}
		setIsLoading(false);
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='PreviousPayments'>
			<div className='section previousPayments'>
				<Par color='#d1d1d1'>Pay with previous payments</Par>
				<Spacing padding='15px 0'>
					<div className='paymentsList'>{paymentMethodsWidgets}</div>
				</Spacing>
			</div>
			{selectedPaymentMethod && (
				<Spacing padding='0 0 15px 0'>
					<Button filled isLoading={isLoading} onClick={makePayment}>
						Pay
					</Button>
				</Spacing>
			)}
			{error && <h5>{error}</h5>}

			{/* STYLE */}
			<style jsx>{`
				.PreviousPayments {
					margin-top: 15px;
				}
				.paymentsList {
					display: flex;
					flex-wrap: wrap;
				}
			`}</style>
		</div>
	);
};

export default PreviousPayments;
