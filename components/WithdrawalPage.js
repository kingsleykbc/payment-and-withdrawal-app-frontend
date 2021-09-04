import React from 'react';
import Withdraw from './ProjectUI/Withdraw';
import TabbedView from './UI/TabbedView';
import Orders from './WithdrawalPageComponents/Orders';
import Withdrawals from './WithdrawalPageComponents/Withdrawals';

const WithdrawalPage = ({ data: { orders, withdrawals } }) => {
	return (
		<>
			<Withdraw />
			<TabbedView
				label1='Orders'
				label2='Withdrawals'
				view1={<Orders data={orders} />}
				view2={<Withdrawals data={withdrawals} />}
				viewPadding='0'
			/>
		</>
	);
};

export default WithdrawalPage;
