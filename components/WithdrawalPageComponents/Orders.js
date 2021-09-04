import React from 'react';
import Container from '../UI/Container';
import { Row } from '../UI/Flex';
import ListView from '../UI/ListView';
import Price from '../UI/Price';
import Order from './OrdersComponents/Order';

const Orders = ({ data: { amountDue, orders } }) => {
	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Orders'>
			<Container hasBorder borderDirections='b' paddingVertical='20px' marginBottom='20px' borderColor='#000'>
				<Row justify='space-between'>
					<div>
						<span>TOTAL: </span>
						<Price showSymbol price={amountDue} />
					</div>
					<button>Withdraw</button>
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
