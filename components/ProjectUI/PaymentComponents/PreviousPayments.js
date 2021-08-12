import React, { useState } from 'react';
import { deletePaymentMethod } from '../../../utils/apiCalls/paymentMethods';
import PageDivider from '../../UI/PageDivider';
import PaymentMethod from './PreviousPaymentsComponents/PaymentMethod';
import { Par } from '../../UI/TextComponents';
import Spacing from '../../UI/Spacing';
import { chargePreviousPayment } from '../../../utils/apiCalls/payments';
import { getError } from '../../../utils/functions';
import Button from '../../UI/Button';

const PreviousPayments = ({ charge, paymentMethods, onPay, onError, refreshUserData, areYouSureRef, amount, snackbarRef }) => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [paymentDets, setPaymentDets] = useState(null);

	/**
	 * LIST PAYMENT METHODS
	 */
	const paymentMethodsWidgets = paymentMethods.map(({ _id, category, details }, ind) => {
		const isSelected = _id === (selectedPaymentMethod && selectedPaymentMethod._id);
		const removeFunc = () => {
			areYouSureRef.current.openAreYouSureBox({
				message: 'You are about to delete this payment method',
				onYes: async () => {
					await deletePaymentMethod(_id);
					await refreshUserData();
					if (isSelected) setSelectedPaymentMethod(null);
					snackbarRef.current.openSnackbar({ type: 'error', message: 'Payment method removed' });
				}
			});
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
			<PageDivider vPadding='40px'>OR</PageDivider>
			<div className='section previousPayments'>
				<Par color='#d1d1d1'>Pay with previous payments</Par>
				<Spacing padding='20px 0'>{paymentMethodsWidgets}</Spacing>
			</div>
			{selectedPaymentMethod && (
				<button isLoading={isLoading} onClick={makePayment} disabled={isLoading}>
					{!isLoading ? 'PAY' : 'Paying...'}
				</button>
			)}
			{/*  <Button isLoading={isLoading} onClick={makePayment}> PAY </Button> */}
			{error && <h5>{error}</h5>}
			{paymentDets && <pre>{JSON.stringify(paymentDets, null, 2)}</pre>}
		</div>
	);
};

export default PreviousPayments;
