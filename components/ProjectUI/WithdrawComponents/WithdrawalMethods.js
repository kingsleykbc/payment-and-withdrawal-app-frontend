import React, { useState } from 'react';
import PaymentMethod from '../PaymentComponents/PreviousPaymentsComponents/PaymentMethod';
import Spacing from '../../UI/Spacing';
// import { deletePaymentMethod } from '../../../utils/apiCalls/withdrawalMethods';
import { chargePreviousPayment } from '../../../utils/apiCalls/payments';
import { getError, getTransactionFee } from '../../../utils/functions';
import Button from '../../UI/Button';
import ConfirmWithdrawal from './WithdrawalMethodsComponents/ConfirmWithdrawal';

const WithdrawalMethods = ({
	authContext: {
		userData: { withdrawalMethods },
		refreshUserData
	},
	charge,
	onPay,
	onError,
	amount,
	snackbarRef
}) => {
	const [amountObject, setAmountObject] = useState(getTransactionFee(amount, 'withdrawal', 'paystack'));
	const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = useState(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * LIST WITHDRAWAL METHODS
	 */
	const withdrawalMethodsWidgets = withdrawalMethods.map(({ _id, category, details }, ind) => {
		const isSelected = _id === (selectedWithdrawalMethod && selectedWithdrawalMethod._id);

		const removeFunc = async () => {
			// await deletePaymentMethod(_id);
			await refreshUserData();
			if (isSelected) setSelectedWithdrawalMethod(null);
			snackbarRef.current.openSnackbar({ type: 'error', message: 'Payment method removed' });
		};
		const selectFunc = () => setSelectedWithdrawalMethod(withdrawalMethods[ind]);
		return (
			<PaymentMethod
				key={_id}
				type='withdrawal'
				category={category}
				charge={charge}
				isSelected={isSelected}
				onSelect={selectFunc}
				onRemove={removeFunc}
				data={details}
			/>
		);
	});

	/**
	 * MAKE WITHDRAWAL
	 */
	const withdrawFunds = async () => {
		setIsLoading(true);
		try {
			const payment = await chargePreviousPayment(amount, selectedWithdrawalMethod._id);
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
		<div className='WithdrawalMethods'>
			<div className='withdrawalMethodsList'>{withdrawalMethodsWidgets}</div>
			{selectedWithdrawalMethod && <ConfirmWithdrawal isLoading={isLoading} withdrawFunds={withdrawFunds} amountObject={amountObject} />}
			{error && <h5>{error}</h5>}

			{/* STYLE */}
			<style jsx>{`
				.WithdrawalMethods {
					margin-top: 15px;
				}
				.withdrawalMethodsList {
					display: flex;
					flex-wrap: wrap;
				}
			`}</style>
		</div>
	);
};

export default WithdrawalMethods;
