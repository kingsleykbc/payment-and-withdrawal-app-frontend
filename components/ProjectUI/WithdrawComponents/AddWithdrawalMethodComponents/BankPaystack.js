import React, { useState } from 'react';
import { GET_PAYSTACK_BANKS_AS_OPTIONS } from '../../../../config/paystackBanks';
import { addWithdrawalMethod } from '../../../../utils/apiCalls/withdrawalMethods';
import { getError } from '../../../../utils/functions';
import Align from '../../../UI/Align';
import Button from '../../../UI/Button';
import { InputField, InputSelect } from '../../../UI/FormFields';

const BankPaystack = ({ onAdd, userData: { name } }) => {
	const [bank_code, setBank_code] = useState('');
	const [account_number, setAccount_number] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState('');

	/**
	 * ADD BANK
	 */
	const addPaystackBank = async () => {
		setIsLoading(true);
		setErr('');
		try {
			if (!account_number || !bank_code) throw { errMessage: 'Please complete all fields' };
			const data = { description: 'Seller withdrawal', name, bank_code, account_number };
			await addWithdrawalMethod('paystack-recipient_nuban', data);
			onAdd();
		} catch (e) {
			setErr(getError(e).message);
			setIsLoading(false);
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='BankPaystack'>
			<InputSelect label='Bank' placeholder='Bank' value={bank_code} onChange={({ target: { value } }) => setBank_code(value)}>
				<option value='' disabled>
					--
				</option>
				{GET_PAYSTACK_BANKS_AS_OPTIONS()}
			</InputSelect>
			<InputField
				label='Account number'
				placeholder='0000000000'
				value={account_number}
				onChange={({ target: { value } }) => setAccount_number(value)}
			/>

			{err && <h5>{err}</h5>}

			<Align padding='10px 0'>
				<Button isLoading={isLoading} filled onClick={addPaystackBank}>
					Add Bank
				</Button>
			</Align>

			{/* STYLE */}
			<style jsx>{`
				.BankPaystack :global(option) {
					color: #000;
				}
			`}</style>
		</div>
	);
};

export default BankPaystack;
