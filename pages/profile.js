import React from 'react';
import withAuth from '../hooks/withAuth';
import ProfilePage from '../components/ProfilePage';

const withdrawal = props => {
	return <ProfilePage />;
};

export default withAuth(withdrawal);
