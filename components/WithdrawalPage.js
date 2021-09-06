import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import TabbedView from './UI/TabbedView';
import Orders from './WithdrawalPageComponents/Orders';
import Withdrawals from './WithdrawalPageComponents/Withdrawals';

const WithdrawalPage = ({ data: { orders, withdrawals } }) => {
	const authContext = useContext(AuthContext);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<>
			<TabbedView
				label1='Orders'
				label2='Withdrawals'
				view1={<Orders data={orders} authContext={authContext} />}
				view2={<Withdrawals data={withdrawals} />}
				viewPadding='0'
			/>
		</>
	);
};

export default WithdrawalPage;
