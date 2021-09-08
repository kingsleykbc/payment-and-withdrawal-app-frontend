import React, { useState } from 'react';
import BankPaystack from './AddWithdrawalMethodComponents/BankPaystack';
import SelectType from './AddWithdrawalMethodComponents/SelectType';

const AddWithdrawalMethod = ({ setView, authContext: { refreshUserData, userData } }) => {
	const [type, setType] = useState('paystack-recipient_nuban');

	/**
	 * ON ADD METHOD
	 */
	const onAddMethod = async param => {
		try {
			await refreshUserData();
			setView('WithdrawalMethods');
		} catch (e) {}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='AddWithdrawalMethod'>
			<SelectType setType={setType} selectedType={type} setView={setView} />
			{type === 'paystack-recipient_nuban' && <BankPaystack userData={userData} onAdd={onAddMethod} />}
		</div>
	);
};

export default AddWithdrawalMethod;
