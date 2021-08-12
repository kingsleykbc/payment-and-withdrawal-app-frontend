import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/functions';
import { getBookData } from '../utils/apiCalls/books';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = useContext(AuthContext);
	const [bookError, setBookError] = useState('');
	const [bookData, setBookData] = useState({});

	/**
	 * HANDLE REGISTER
	 */
	const handleLogin = async () => {
		setError('');
		try {
			const data = await login({ email, password });
			console.log(data);
		} catch (e) {
			const { message } = getError(e, 'Error registering');
			setError(message);
		}
	};

	/**
	 * CHECK BOOK
	 */
	const checkBook = async () => {
		setBookError('');
		setBookData({});

		try {
			const data = await getBookData();
			setBookData(data);
		} catch (e) {
			const { message } = getError(e, 'Error getting book');
			setBookError(message);
		}
	};

	// ================================================================================================
	//  UI
	// ================================================================================================
	return (
		<Layout>
			<h1>Login</h1>
			<div>
				<input placeholder='Email' type='text' onChange={({ target: { value } }) => setEmail(value)} />
				<input
					placeholder='Password'
					type='text'
					onKeyDown={({ keyCode }) => {
						if (keyCode === 13) handleLogin();
					}}
					onChange={({ target: { value } }) => setPassword(value)}
				/>
			</div>
			<br />
			{error && <h5>{error}</h5>}
			<br />
			<div style={{ textAlign: 'center' }}>
				<button onClick={handleLogin}>Login</button>
			</div>
		</Layout>
	);
};

export default Login;
