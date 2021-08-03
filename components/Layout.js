import {useContext} from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Head from 'next/head';
import { useCookie } from 'react-use';
import { AuthContext } from '../contexts/AuthContext';

const Layout = ({ children }) => {
	const { isAuthenticated, userData } = useContext(AuthContext);

	return (
		<div className='Layout'>
			<Head>
				<title>{isAuthenticated ? userData.name : 'Samurai List'}</title>
			</Head>

			<Navbar />
			<main>{children}</main>
			<Footer />

			{/* STYLE */}
			<style jsx>{`
				main {
					max-width: 800px;
					margin: auto;
					padding: 15px 25px 25px 25px;
				}
			`}</style>
		</div>
	);
};

export default Layout;
