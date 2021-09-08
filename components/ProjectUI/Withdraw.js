import React, { useRef, useState } from 'react';
import Button from '../UI/Button';
import Container from '../UI/Container';
import { Row } from '../UI/Flex';
import OTP from '../UI/OTP';
import Price from '../UI/Price';
import Snackbar from '../UI/Snackbar';
import { Text } from '../UI/TextComponents';
import AddWithdrawalMethod from './WithdrawComponents/AddWithdrawalMethod';
import FinalizeWithdrawal from './WithdrawComponents/FinalizeWithdrawal';
import WithdrawalMethods from './WithdrawComponents/WithdrawalMethods';
import WithdrawalSuccessful from './WithdrawComponents/WithdrawalSuccessful';

/**
 * WHEN WOrKING ON THE LBH AND VYBITE, ADD A "FOr" PROP TO DETECT SELLERS AND CUSTOMERS. FOR CUSTOMERS,
 * IT WOULD SEARCH DATA.WITHmETHODS AND FO SELLERS IT WILL SEARCH BUSINESSaCCOUT.WITHDRAWALS. FOR CUSTOMERS,
 * ALSO CALL IT REFUND, NOT WITHDRAWAL. tHE "fOr" PrOP WILL ALSO DETErMINE THE DESCrIPTION WHEN STOrING AS A
 * WITHDrAWAL METHOD AND EMPTY MESSAGE.
 *
 * ALSO MAKE THE WITHDrAWAL AND PAYMENT COMPS rEAD-ONLY IN CHARGE = FALSE MODE
 */

const Withdraw = ({
	amount,
	onWithdraw,
	onError,
	unmountedAfterUse,
	onClose,
	authContext,
	authContext: {
		userData: { _id, withdrawalMethods }
	}
}) => {
	const [view, setView] = useState('WithdrawalMethods');
	const [authField, setAuthField] = useState(null);
	const [withdrawalInitialization, setWithdrawalInitialization] = useState(null);
	const snackbarRef = useRef(null);
	const otpRef = useRef(null);

	/**
	 * SET THE VIEW
	 * @param {'WithdrawalMethods'|'FinalizeWithdrawal'|'AddWithdrawalMethod'} v - View
	 */
	const setV = v => setView(v);

	/**
	 * CLOSE THE WITHDRAWAL BOX (FOR WHEN COMPONENT NOT UNMOUNTED)
	 */
	const closeWithdrawal = () => {
		setView('WithdrawalMethods');
		setAuthField(null);
		setWithdrawalInitialization(null);
		if (onClose) onClose();
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	if (!_id) return 'Loading...';

	return (
		<div className='Withdraw'>
			{/* TITLE */}
			<Container hasBorder borderDirections='b' paddingBottom='15px' marginBottom='15px'>
				<h2>
					Withdraw <Price showSymbol price={amount} inline />{' '}
				</h2>
			</Container>

			{/* INITIALIZE WITHDRAWAL */}
			{view === 'WithdrawalMethods' && (
				<>
					<Container hasBorder borderDirections='b' paddingBottom='10px' marginBottom='15px'>
						<Row justify='space-between'>
							<Text isLightText>Select a method to receive your payment</Text>
							<Button filled={withdrawalMethods.length === 0} onClick={() => setV('AddWithdrawalMethod')}>
								Add withdrawal method
							</Button>
						</Row>
					</Container>

					<WithdrawalMethods
						authContext={authContext}
						amount={amount}
						charge={true}
						onError={onError}
						setView={setV}
						setAuthField={setAuthField}
						setWithdrawalInitialization={setWithdrawalInitialization}
						otpRef={otpRef}
						snackbarRef={snackbarRef}
					/>
				</>
			)}

			{/* FINALIZE WITHDRAWAL */}
			{view === 'FinalizeWithdrawal' && (
				<FinalizeWithdrawal
					authField={authField}
					withdrawalInitialization={withdrawalInitialization}
					onWithdraw={onWithdraw}
					onError={onError}
					snackbarRef={snackbarRef}
					unmountedAfterUse={unmountedAfterUse}
					setView={setV}
				/>
			)}

			{/* WITHDRAWAL SUCCESSFUL */}
			{view === 'WithdrawalSuccessful' && <WithdrawalSuccessful closeWithdrawal={closeWithdrawal} />}

			{/* ADD WITHDRAWAL METHOD */}
			{view === 'AddWithdrawalMethod' && <AddWithdrawalMethod setView={setV} authContext={authContext} />}

			{!authField && (
				<OTP
					subTitle='Please enter the OTP sent to {1} to process your withdrawal.'
					authContext={authContext}
					field='phoneNumber'
					type='authentication'
					ref={otpRef}
					snackbarRef={snackbarRef}
					unmountedAfterUse
				/>
			)}
			<Snackbar ref={snackbarRef} />
		</div>
	);
};

export default Withdraw;
