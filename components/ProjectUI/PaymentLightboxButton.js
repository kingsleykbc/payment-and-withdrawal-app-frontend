import React from 'react';
import ButtonLightbox from '../UI/ButtonLightbox';
import Price from '../UI/Price';
import Payment from './Payment';

const PaymentLightboxButton = ({
	buttonLabel,
	showPrice = true,

	keys = {},
	amount,
	onPay,
	onError,
	authContext,
	unmountedAfterUse,
	onClose
}) => {
	buttonLabel = buttonLabel || <span>Pay {showPrice && <Price showSymbol price={amount} inline />}</span>;

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<ButtonLightbox label={buttonLabel} showTitle={false} autoHeight width='700px'>
			{({ toggle }) => (
				<Payment
					onPay={onPay}
					onError={onError}
					authContext={authContext}
					amount={amount}
					keys={keys}
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

export default PaymentLightboxButton;
