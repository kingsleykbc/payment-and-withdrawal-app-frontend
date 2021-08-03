import React, { useState, useRef } from 'react';
import { usePaystackPayment } from 'react-paystack';
import HorizontalScrollView from '../UI/HorizontalScrollView';
import BankPayment from './PaymentComponents/BankPayment';
import CardPayment from './PaymentComponents/CardPayment';
import NoPaymentMethod from './PaymentComponents/NoPaymentMethod';
import AreYouSureBox from '../UI/AreYouSureBox';
import Snackbar from '../UI/Snackbar';
import { deletePaymentMethod } from '../../utils/apiCalls/paymentMethods';
import OtherPayment from './PaymentComponents/OtherPayment';

const Payment = ({
	charge = true,
	keys = {},
	currency = 'NGN',
	amount,
	onPay,
	onError,
	authContext: {
		refreshUserData,
		userData: { email, paymentMethods }
	}
}) => {
	const [selectedPaymentMethodID, setSelectedPaymentMethodID] = useState(null);
	const areYouSureRef = useRef(null);
	const snackbarRef = useRef(null);

	/**
	 * PAYSTACK PAYMENT (ONLY ONE FOR NOW)
	 */
	const [reference, setReference] = useState('REF_' + new Date().getTime());
	const { publicKey, secretKey } = keys;
	const config = { amount: amount * 100, email, publicKey };
	const initializePayment = usePaystackPayment({ reference, ...config });

	const onSuccess = reference => {
		setReference('REF_' + new Date().getTime());
		onPay({ reference });
	};

	const onClose = () => {
		console.log('closed');
	};

	/**
	 * LIST PAYMENT METHODS
	 */
	const paymentMethodsWidgets = paymentMethods.map(({ _id, type, data }) => {
		const removeFunc = () => {
			areYouSureRef.current.openAreYouSureBox({
				message: 'You are about to delete this payment method',
				onYes: async () => {
					await deletePaymentMethod(_id);
					await refreshUserData();
					snackbarRef.current.openSnackbar({ type: 'error', message: 'Payment method removed' });
				}
			});
		};

		const selectFunc = () => {
			setSelectedPaymentMethodID(_id);
			if (onSelectPaymentID) onSelectPaymentID(_id);
		};
		const isSelected = _id === selectedPaymentMethodID;

		return type === 'card' ? (
			<CardPayment charge={charge} key={_id} isSelected={isSelected} onSelect={selectFunc} onRemove={removeFunc} {...data} />
		) : type === 'bank' ? (
			<BankPayment charge={charge} key={_id} isSelected={isSelected} onSelect={selectFunc} onRemove={removeFunc} {...data} />
		) : (
			<OtherPayment charge={charge} key={_id} isSelected={isSelected} onSelect={selectFunc} onRemove={removeFunc} {...data} />
		);
	});

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Payment'>
			<HorizontalScrollView margin='0 20px'>
				{paymentMethods.length === 0 ? <NoPaymentMethod /> : paymentMethodsWidgets}
			</HorizontalScrollView>
			
			<button onClick={() => initializePayment(onSuccess, onClose)}> PAY </button>

			<AreYouSureBox ref={areYouSureRef} />
			<Snackbar ref={snackbarRef} />
		</div>
	);
};

export default Payment;
