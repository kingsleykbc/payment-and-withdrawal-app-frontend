import React, { useContext } from 'react';
import theme from '../config/theme';
import { AuthContext } from '../contexts/AuthContext';
import { logout } from '../utils/apiCalls/auth';
import Layout from './Layout';
import PhoneVerification from './ProfilePage/PhoneVerification';
import Button from './UI/Button';
import Container from './UI/Container';

const ProfilePage = () => {
	const authContext = useContext(AuthContext);
	const { userData } = authContext;

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<Layout>
			<h1>Profile page</h1>
			{Object.keys(userData).map(k => {
				if (['_id', '__v', 'paymentMethods', 'password', 'isVerified', 'updatedAt', 'withdrawalMethods'].indexOf(k) !== -1)
					return <div key={k}></div>;

				return (
					<div key={k}>
						<p>{k}</p>
						<input readOnly value={userData[k]} />
					</div>
				);
			})}

			<PhoneVerification authContext={authContext} />

			<Container marginVertical='20px' hasBorder borderDirections='t'>
				<Button margin='20px 0' isBold color={theme.colors.dangerColor} onClick={() => logout(true)}>
					Logout
				</Button>
			</Container>
		</Layout>
	);
};

export default ProfilePage;
