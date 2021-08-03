import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next/dist/next-server/server/router';

const Navbar = () => {
	const { isAuthenticated, userData, logout } = useContext(AuthContext);
	return (
		<>
			<Link href='/'>
				<a>
					<h1>{isAuthenticated ? userData.name : 'Samurai List'}</h1>
				</a>
			</Link>

			<nav>
				{/* <Link href='/samurais'>
					<a>Sanurai Listing</a>
				</Link> */}

				{isAuthenticated ? (
					<>
						<Link href='/payment'>
							<a>Payment</a>
						</Link>

						<Link href='/withdrawal'>
							<a>Withdrawal</a>
						</Link>

						<div className='a' onClick={() => logout(true)}>
							Logout
						</div>
					</>
				) : (
					<>
						<Link href='/login'>
							<a>Login</a>
						</Link>

						<Link href='/register'>
							<a>Register</a>
						</Link>
					</>
				)}
			</nav>

			{/* STYLE */}
			<style jsx>{`
				h1 {
					text-align: center;
					margin-top: 20px;
				}
				nav {
					display: flex;
					align-items: center;
					max-width: 800px;
					margin: 20px auto;
					padding: 10px;
					background: rgb(35, 35, 35);
					border-radius: 5px;
				}

				nav a,
				.a {
					flex-grow: 1;
					cursor: pointer;
					margin: 0 5px;
					border-radius: 5px;
					padding: 8px 12px;
					font-weight: bold;
					text-align: center;
					display: inline-block;
				}
			`}</style>
		</>
	);
};

export default Navbar;
