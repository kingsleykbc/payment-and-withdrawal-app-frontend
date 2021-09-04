import { useContext, useRef } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Head from 'next/head';
import { useCookie } from 'react-use';
import { AuthContext } from '../contexts/AuthContext';
import OTP from './UI/OTP';
import VerifyAccountPage from './VerifyAccountPage';

const Layout = ({ children }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, userData } = authContext;

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='Layout'>
			<Head>
				<title>{isAuthenticated ? userData.name : 'Samurai List'}</title>
			</Head>

			<Navbar />
			<main>{isAuthenticated && !userData.isVerified ? <VerifyAccountPage authContext={authContext} /> : children}</main>
			<Footer />

			<div id='portal'></div>

			{/* STYLE */}
			<style jsx>{`
				main {
					max-width: 800px;
					margin: auto;
					padding: 20px;
				}
			`}</style>
		</div>
	);
};

export default Layout;
