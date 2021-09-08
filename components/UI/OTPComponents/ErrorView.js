import React from 'react';
import { Text } from '../TextComponents';
import IcPhone from 'react-icons/lib/md/phone';
import IcEmail from 'react-icons/lib/md/mail';
import Spacing from '../Spacing';
import LinkButton from '../LinkButton';

const ErrorView = ({
	authContext: {
		field,
		userData: { phoneNumber, email }
	}
}) => {
	let icon, title, subTitle;

	// Get title and sub title
	if (field === 'email') {
		icon = <IcEmail />;
		if (!email) {
			title = 'No verified email';
			subTitle = 'Please add and verify your email address in settings.';
		} else {
			title = 'Email not verified';
			subTitle = 'Please verify your email address in settings.';
		}
	} else {
		icon = <IcPhone />;
		if (!phoneNumber) {
			title = 'No verified phone number';
			subTitle = 'Please add and verify your phone number in settings.';
		} else {
			title = 'Phone number not verified';
			subTitle = 'Please verify your phone number in settings.';
		}
	}

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='ErrorView'>
			<div className='icon'>{icon}</div>
			<h3> {title}</h3>

			<Spacing padding='15px 0'>
				<Text isLightText> {subTitle} </Text>
			</Spacing>

			<LinkButton href="/profile" margin='10px 0'>Open settings</LinkButton>

			{/* STYLE */}
			<style jsx>{`
				.ErrorView {
					text-align: center;
				}
				.icon {
					font-size: 4rem;
					width: 110px;
					height: 110px;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					border: 5px solid #000;
					border-radius: 50%;
					margin: 30px 0;
				}
			`}</style>
		</div>
	);
};

export default ErrorView;
