import React, { useState, useRef, useEffect } from 'react';
import {
	sendOTPEmailAuthentication,
	sendOTPEmailVerification,
	sendOTPWhatsAppAuthentication,
	sendOTPWhatsAppVerification,
	validateOTPEmailAuthentication,
	validateOTPEmailVerification,
	validateOTPWhatsAppAuthentication,
	validateOTPWhatsAppVerification
} from '../../../utils/apiCalls/auth';
import { getError, showPartial } from '../../../utils/functions';
import Button from '../Button';
import { Row } from '../Flex';
import Spacing from '../Spacing';
import TextButton from '../TextButton';
import { Text } from '../TextComponents';

const AuthenticateField = ({
	setView,
	subTitle,
	allowFieldChange,
	onValidateOTP,
	title,
	unmountedAfterUse,
	field,
	type,
	authContext: { userData, refreshUserData }
}) => {
	const [resendTimer, setResendTimer] = useState(0);
	const [code, setCode] = useState('');
	const [isValidating, setIsValidating] = useState(false);
	const [err, setErr] = useState('');
	const [token, setToken] = useState(null);

	/**
	 * SEND THE FIRST OTP
	 */
	useEffect(() => {
		sendOTP();
	}, []);

	/**
	 * RESEND TIMER
	 */
	useEffect(() => {
		if (resendTimer <= 0) return;

		let iVal = setTimeout(() => {
			setResendTimer(resendTimer - 1);
		}, 1000);

		return () => clearTimeout(iVal);
	}, [resendTimer]);

	/**
	 * SEND OTP
	 */
	const sendOTP = async () => {
		setErr('');
		setCode('');

		try {
			let data;
			if (type === 'verification') {
				data = field === 'email' ? await sendOTPEmailVerification() : await sendOTPWhatsAppVerification();
			} else {
				data = field === 'email' ? await sendOTPEmailAuthentication() : await sendOTPWhatsAppAuthentication();
			}
			setToken(data.token);
			setResendTimer(5);
		} catch (e) {
			setErr(getError(e).message);
		}
	};

	/**
	 * VALIDATE THE CODE
	 */
	const validateOTP = async () => {
		setIsValidating(true);
		setErr('');

		try {
			if (type === 'verification') {
				if (field === 'email') await validateOTPEmailVerification(token, code);
				else await validateOTPWhatsAppVerification(token, code);
			} else {
				if (field === 'email') await validateOTPEmailAuthentication(token, code);
				else await validateOTPWhatsAppAuthentication(token, code);
			}

			await refreshUserData();
			onValidateOTP();
		} catch (e) {
			setErr(getError(e).message);
			setIsValidating(false);
		}

		if (!unmountedAfterUse) setIsValidating(false);
	};

	/**
	 * SETUP TEXT
	 */
	const partial = field === 'email' ? showPartial(userData.email, 'email') : showPartial(userData.phoneNumber, 'phoneNumber');
	subTitle = subTitle ? subTitle.replace('{1}', partial) : `Please enter the OTP sent to ${partial}.`;
	if (field === 'phoneNumber') field = 'phone number';
	title = title || type === 'authentication' ? 'Authenticate account' : `Verify ${field}`;

	const canResend = resendTimer <= 0;
	const canVerify = code.length === 6 && !isNaN(code);

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='AuthenticateField'>
			{/* TITLE */}
			<Spacing padding='15px 0'>
				<Text isLightText isSmallText>
					{subTitle}
				</Text>
				{field === 'email' && (
					<div>
						<Text isLightText isSmallText>
							(Please also check your spam/junk folder)
						</Text>
					</div>
				)}
			</Spacing>

			{/* FIELD */}
			<input placeholder='000 000' value={code} onChange={({ target: { value } }) => setCode(value)} maxLength={6} />

			{err && <h5>{err}</h5>}

			<Spacing padding='20px 0'>
				<Button disabled={!canVerify} isLoading={isValidating} filled onClick={validateOTP}>
					Validate OTP
				</Button>
			</Spacing>

			{/* OPTIONS */}
			<Row justify='center'>
				<TextButton isSmallText isLightText onClick={sendOTP} disabled={!canResend}>
					{canResend ? `Resend OTP to ${field}` : `Wait ${resendTimer} seconds to resend`}
				</TextButton>

				{allowFieldChange && (
					<Spacing padding='0 0 0 20px'>
						<TextButton isSmallText isLightText onClick={() => setView('AddOrUpdateFieldValue')}>
							Change {field}
						</TextButton>
					</Spacing>
				)}
			</Row>

			{/* STYLE */}
			<style jsx>{`
				.AuthenticateField {
					text-align: center;
				}

				input {
					font-size: 1.5rem !important;
					text-align: center;
					max-width: 200px;
				}
			`}</style>
		</div>
	);
};

export default AuthenticateField;
