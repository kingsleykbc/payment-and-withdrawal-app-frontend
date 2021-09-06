import React, { useRef, useState } from 'react';
import { getTransactionFee } from '../../utils/functions';
import AreYouSureBox from '../UI/AreYouSureBox';
import Button from '../UI/Button';
import Container from '../UI/Container';
import { Row } from '../UI/Flex';
import Price from '../UI/Price';
import Snackbar from '../UI/Snackbar';
import { Text } from '../UI/TextComponents';
import WithdrawalMethods from './WithdrawComponents/WithdrawalMethods';

const Withdraw = ({
	amount,
	onWithdraw,
	onError,
	authContext,
	authContext: {
		userData: { _id, withdrawalMethods }
	}
}) => {
	const [view, setView] = useState('WithdrawalMethods');
	const areYouSureRef = useRef(null);
	const snackbarRef = useRef(null);
	const otpRef = useRef(null);

	/**
	 * SET THE VIEW
	 * @param {'WithdrawalMethods'|'AddWithdrawalMethod'} v - View
	 */
	const setV = v => setView(v);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!_id) return 'Loading...';

	return (
		<div className='Withdraw'>
			{/* TITLE */}
			<h2>
				Withdraw <Price showSymbol price={amount} inline />
			</h2>

			{/* ADD BUTTON */}
			<Container marginVertical='20px' paddingBottom='10px' hasBorder borderDirections='b'>
				<Row justify='space-between'>
					<Text isLightText>Select a method to receive your payment</Text>
					<Button filled={withdrawalMethods.length === 0}> Add withdrawal method</Button>
				</Row>
			</Container>

			{/* WITHDRAWAL METHODS LIST */}
			{view === 'WithdrawalMethods' && (
				<WithdrawalMethods
					amount={amount}
					charge={true}
					onWithdraw={onWithdraw}
					onError={onError}
					authContext={authContext}
					areYouSureRef={areYouSureRef}
					snackbarRef={snackbarRef}
					otpRef={otpRef}
				/>
			)}

			<AreYouSureBox ref={areYouSureRef} />
			<Snackbar ref={snackbarRef} />
		</div>
	);
};

export default Withdraw;
