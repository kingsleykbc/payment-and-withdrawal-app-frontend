import React, { useRef } from 'react';
import OTP from './UI/OTP';
import Spacing from './UI/Spacing';

const VerifyAccountPage = ({ authContext }) => {
	const otpREF = useRef(null);

	/**
	 * HANDLE OTP SENDING
	 */
	const verifyAccount = () => {
		otpREF.current.sendOTP({ onVerify: () => alert('VERIFIED O!') });
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='verifyAccount'>
			<h3>Account Not Authenticated</h3>
			<Spacing padding='10px' />
			<button onClick={verifyAccount}>Verify Account</button>

			<OTP allowFieldChange ref={otpREF} authContext={authContext} field='email' type='verification' />

			{/* STYLE */}
			<style jsx>{`
				h3 {
					text-align: center;
				}
				div {
					text-align: center;
				}
			`}</style>
		</div>
	);
};

export default VerifyAccountPage;
