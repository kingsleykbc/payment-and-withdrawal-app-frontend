import React, { useState } from 'react';
import PaymentMethod from '../PaymentComponents/PreviousPaymentsComponents/PaymentMethod';
import { getError, getTransactionFee } from '../../../utils/functions';
import ConfirmWithdrawal from './WithdrawalMethodsComponents/ConfirmWithdrawal';
import { deleteWithdrawalMethod } from '../../../utils/apiCalls/withdrawalMethods';
import { initializeFundsWithdrawal } from '../../../utils/apiCalls/withdrawals';
import NoWithdrawalMethods from './WithdrawalMethodsComponents/NoWithdrawalMethods';

const WithdrawalMethods = ({
	authContext: {
		userData: { withdrawalMethods },
		refreshUserData
	},
	charge,
	onError,
	amount,
	setView,
	setAuthField,
	setWithdrawalInitialization,
	snackbarRef,
	otpRef
}) => {
	const [amountObject, setAmountObject] = useState(getTransactionFee(amount, 'withdrawal', 'paystack'));
	const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = useState(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * MAKE WITHDRAWAL
	 */
	const handleWithdrawFunds = async () => {
		setIsLoading(true);
		try {
			const initialization = await initializeFundsWithdrawal(selectedWithdrawalMethod._id);
			setWithdrawalInitialization(initialization);
			setView('FinalizeWithdrawal');
		} catch (e) {
			const { message } = getError(e);
			setError(message);
			if (onError) onError(message);
			setIsLoading(false);
		}
	};

	/**
	 * WITHDRAW FUNDS
	 */
	const withdrawFunds = () => {
		otpRef.current.sendOTP({
			onValidate: async authField => {
				setAuthField(authField);
				handleWithdrawFunds();
			}
		});
	};

	/**
	 * LIST WITHDRAWAL METHODS
	 */
	const withdrawalMethodsWidgets = withdrawalMethods.map(({ _id, category, details }, ind) => {
		const isSelected = _id === (selectedWithdrawalMethod && selectedWithdrawalMethod._id);

		const removeFunc = async () => {
			await deleteWithdrawalMethod(_id);
			await refreshUserData();
			if (isSelected) setSelectedWithdrawalMethod(null);
			snackbarRef.current.openSnackbar({ type: 'error', message: 'Withdrawal method removed' });
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

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='WithdrawalMethods'>
			{withdrawalMethods.length === 0 && <NoWithdrawalMethods />}
			<div className='withdrawalMethodsList'>{withdrawalMethodsWidgets}</div>
			{selectedWithdrawalMethod && <ConfirmWithdrawal isLoading={isLoading} withdrawFunds={withdrawFunds} amountObject={amountObject} />}
			{error && <h5>{error}</h5>}

			{/* STYLE */}
			<style jsx>{`
				.WithdrawalMethods {
					margin-top: 15px;
				}
			`}</style>
		</div>
	);
};

export default WithdrawalMethods;
