import React from 'react';
import ButtonLightbox from '../UI/ButtonLightbox';
import Price from '../UI/Price';
import Withdraw from './Withdraw';

const WithdrawLightboxButton = ({
	buttonLabel,
	showPrice = true,

	amount,
	authContext,
	onWithdraw,
	onError,
	unmountedAfterUse,
	onClose
}) => {
	buttonLabel = buttonLabel || <span>Withdraw {showPrice && <Price showSymbol price={amount} inline />}</span>;

	return (
		<ButtonLightbox label={buttonLabel} showTitle={false} autoHeight width='700px'>
			{({ toggle }) => (
				<Withdraw
					amount={amount}
					onWithdraw={onWithdraw}
					onError={onError}
					authContext={authContext}
					unmountedAfterUse={unmountedAfterUse}
					onClose={() => {
						toggle();
						if (onClose) onClose();
					}}
				/>
			)}
		</ButtonLightbox>
	);
};

export default WithdrawLightboxButton;
