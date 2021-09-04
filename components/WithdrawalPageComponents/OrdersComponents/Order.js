import React from 'react';
import { formattedDate } from '../../../utils/helpers/dateTime';
import ViewPayment from '../../ProjectUI/ViewPayment';
import Price from '../../UI/Price';

const Order = ({ createdAt, price, hasWithdrawn, paymentID }) => {
	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<tr>
			<td>{formattedDate(createdAt, 'DD-MM-YY')}</td>
			<td>
				<Price price={price} />
			</td>
			<td>{hasWithdrawn.toString()}</td>
			<td>
				<ViewPayment paymentID={paymentID} />
			</td>

			{/* STYLE */}
			<style jsx>{`
				tr {
					opacity: ${hasWithdrawn ? '0.4' : '1'};
				}
			`}</style>
		</tr>
	);
};

export default Order;
