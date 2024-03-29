import React, { useState, useRef } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { Par } from '../../UI/TextComponents';
import Spacing from '../../UI/Spacing';
import { InputCheckButton } from '../../UI/FormFields';
import { savePaymentMethod } from '../../../utils/apiCalls/paymentMethods';
import { getTransactionFee } from '../../../utils/functions';

const NewPaystackPayment = ({ snackbarRef, keys = {}, amount, onPay, onError, refreshUserData, hasPreviousPaymentMethods, email }) => {
	const [saveNewPayment, setSaveNewPayment] = useState(true);
	const [reference, setReference] = useState('REF_' + new Date().getTime());
	const { publicKey } = keys;
	const config = { amount: amount * 100, email, publicKey };
	const initializePayment = usePaystackPayment({ reference, ...config });

	/**
	 * ON PAYMENT SUCCESSFUL
	 */
	const onSuccess = async data => {
		if (data.status !== 'success') {
			onError(data);
			return;
		}
		const { reference } = data;
		setReference('REF_' + new Date().getTime());
		onPay({
			method: 'Paystack charge',
			provider: 'paystack',
			data: { reference },
			amount: getTransactionFee(amount, 'payment', 'paystack')
		});
		if (saveNewPayment) {
			await savePaymentMethod('paystack-authorization', { reference });
			refreshUserData();
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='section'>
			<Spacing padding='15px 0'>
				<Par color='#d1d1d1'>Pay with {hasPreviousPaymentMethods && 'new'} debit/credit card, bank, or USSD</Par>
				<Spacing padding='15px 0 25px 0'>
					<InputCheckButton
						label='Save details after payment'
						checked={saveNewPayment}
						onChange={() => setSaveNewPayment(!saveNewPayment)}
					/>
				</Spacing>
				<button onClick={() => initializePayment(onSuccess)}> PAY </button>
			</Spacing>
		</div>
	);
};

export default NewPaystackPayment;
