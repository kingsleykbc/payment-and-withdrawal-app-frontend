import React, { useState, useRef } from 'react';
import { finalizeFundsWithdrawal } from '../../../utils/apiCalls/withdrawals';
import { getError } from '../../../utils/functions';
import Button from '../../UI/Button';
import Spacing from '../../UI/Spacing';
import { Text } from '../../UI/TextComponents';

const FinalizeWithdrawal = ({ snackbarRef, onWithdraw, onError, authField, withdrawalInitialization, unmountedAfterUse, setView }) => {
	const [err, setErr] = useState('');
	const [isFinishing, setIsFinishing] = useState(false);
	const valRef = useRef(null);

	// Biller Initialization for paystack (in future, you can make this dynamic)
	const {
		message,
		data: { status }
	} = withdrawalInitialization;

	/**
	 * FINALIZE THE WITHDRAWAL
	 */
	const finishPayment = async () => {
		setIsFinishing(true);
		try {
			const authData = { [status]: valRef.current.value };
			const withdrawal = await finalizeFundsWithdrawal(withdrawalInitialization, authData, authField);

			if (onWithdraw) onWithdraw(withdrawal);
			if (!unmountedAfterUse) {
				snackbarRef.current.openSnackbar({ type: 'success', message: 'Withdrawal successful' });
				setView('WithdrawalSuccessful');
			}
		} catch (e) {
			const { message } = getError(e);
			setErr(message);
			if (onError) onError(message);
			setIsFinishing(false);
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='FinalizeWithdrawal'>
			<h3>Response from Bank</h3>

			<Spacing padding='15px 0'>
				<Text isLightText>{message}</Text>
			</Spacing>
			<input type='text' ref={valRef} placeholder={status.toUpperCase()} />

			<Spacing padding='15px 0'>
				<Button filled isLoading={isFinishing} onClick={finishPayment}>
					Finish Withdrawal
				</Button>
			</Spacing>

			{err && <h5>{err}</h5>}

			{/* STYLE */}
			<style jsx>{`
				.FinalizeWithdrawal {
					text-align: center;
					padding: 20px;
				}
				input {
					max-width: 250px;
					text-align: center;
				}
			`}</style>
		</div>
	);
};

export default FinalizeWithdrawal;
