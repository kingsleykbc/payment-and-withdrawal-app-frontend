import React from 'react';
import ListView from '../UI/ListView';
import Withdrawal from './WithdrawalsComponents/Withdrawal';

const Withdrawals = ({ data }) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Amount</th>
						<th>Auth</th>
						<th>Payment</th>
					</tr>
				</thead>
				<tbody>
					<ListView data={data} component={Withdrawal} />
				</tbody>
			</table>
		</div>
	);
};

export default Withdrawals;
