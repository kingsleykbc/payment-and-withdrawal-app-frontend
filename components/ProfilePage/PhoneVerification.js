import React, { useRef } from 'react';
import Button from '../UI/Button';
import { Row } from '../UI/Flex';
import OTP from '../UI/OTP';
import Spacing from '../UI/Spacing';
import { Text } from '../UI/TextComponents';

const PhoneVerification = ({ authContext }) => {
	const {
		userData: { isPhoneVerified }
	} = authContext;

	const otpREF = useRef();

	/**
	 * VERIFY PHONE
	 */
	const verifyPhoneNumber = () => {
		otpREF.current.sendOTP();
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<>
			{!isPhoneVerified && (
				<Spacing padding='20px 0 0 0'>
					<Row>
						<Text isLightText>Phone not verified!</Text>
						<Button margin='0 0 0 20px' onClick={verifyPhoneNumber}>
							Verify now
						</Button>
					</Row>
				</Spacing>
			)}

			<OTP allowFieldChange ref={otpREF} authContext={authContext} field='phoneNumber' type='verification' />
		</>
	);
};

export default PhoneVerification;
