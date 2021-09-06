import React from 'react';
import ButtonLightbox from '../UI/ButtonLightbox';
import Price from '../UI/Price';
import Withdraw from './Withdraw';

const WithdrawLightboxButton = ({ buttonLabel, showPrice = true, amount, onWithdraw, onError, authContext }) => {
	buttonLabel = buttonLabel || <span>Withdraw {showPrice && <Price showSymbol price={amount} inline />}</span>;

	return (
		<ButtonLightbox label={buttonLabel} showTitle={false}>
			<Withdraw amount={amount} onWithdraw={onWithdraw} onError={onError} authContext={authContext} />
		</ButtonLightbox>
	);
};

export default WithdrawLightboxButton;
