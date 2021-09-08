import React from 'react';
import { formattedDate } from '../../../utils/helpers/dateTime';
import ViewPayment from '../../ProjectUI/ViewPayment';
import Price from '../../UI/Price';

const Withdrawal = ({ date, totalAmount, authField, paymentID }) => {

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<tr>
			<td>{formattedDate(date, 'DD-MM-YY')}</td>
			<td>
				<Price price={totalAmount} />
			</td>
			<td>{authField[Object.keys(authField)[0]]}</td>
			<td>
				<ViewPayment paymentID={paymentID} />
			</td>
		</tr>
	);
};

export default Withdrawal;
