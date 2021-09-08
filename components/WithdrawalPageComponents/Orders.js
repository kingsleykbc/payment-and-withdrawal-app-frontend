import { useRouter } from 'next/router';
import React from 'react';
import Withdraw from '../ProjectUI/Withdraw';
import WithdrawLightboxButton from '../ProjectUI/WithdrawLightboxButton';
import Container from '../UI/Container';
import { Row } from '../UI/Flex';
import ListView from '../UI/ListView';
import Price from '../UI/Price';
import Spacing from '../UI/Spacing';
import Order from './OrdersComponents/Order';

const Orders = ({ authContext, data: { amountDue, orders } }) => {
	const router = useRouter();

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Orders'>
			<Spacing padding='30px 0'>
				<Withdraw
					amount={amountDue}
					authContext={authContext}
					onWithdraw={w => {
						console.log(w);
						router.reload();
					}}
					onError={e => console.log(e)}
					unmountedAfterUse
				/>
			</Spacing>

			<Container hasBorder borderDirections='b' paddingVertical='20px' marginBottom='20px' borderColor='#000'>
				<Row justify='space-between'>
					<div>
						<span>TOTAL: </span>
						<Price showSymbol price={amountDue} />
					</div>
					<WithdrawLightboxButton amount={amountDue} authContext={authContext} />
				</Row>
			</Container>

			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Price</th>
						<th>Withdrawn</th>
						<th>Payment</th>
					</tr>
				</thead>
				<tbody>
					<ListView data={orders} component={Order} />
				</tbody>
			</table>
		</div>
	);
};

export default Orders;
