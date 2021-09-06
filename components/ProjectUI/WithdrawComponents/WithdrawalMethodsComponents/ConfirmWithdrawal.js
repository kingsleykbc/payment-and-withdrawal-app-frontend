import React from 'react';
import Button from '../../../UI/Button';
import Spacing from '../../../UI/Spacing';
import { InfoText } from '../../../UI/TextComponents';

const ConfirmWithdrawal = ({ isLoading, withdrawFunds, amountObject: { amount, billerFee, appFee, amountAfterFees } }) => {
	return (
		<Spacing padding='10px 0'>
			<Spacing padding='0 0 15px 0'>
				<InfoText>
					The app charges 0% transaction fees on all withdrawals. However, your selected withdrawal service may charge transaction fees.
				</InfoText>
			</Spacing>

			<Button filled isLoading={isLoading} onClick={withdrawFunds}>
				Withdraw funds
			</Button>
		</Spacing>
	);
};

export default ConfirmWithdrawal;
