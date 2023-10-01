import { useState } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/functions';
import { registerUser } from '../utils/apiCalls/auth';
import { getBookData } from '../utils/apiCalls/books';
import { useRouter } from 'next/router';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [bookError, setBookError] = useState('');
	const router = useRouter();

	/**
	 * HANDLE REGISTER
	 */
	const handleRegister = async () => {
		setError('');
		try {
			const data = await registerUser({ name, email, password });
			router.push('/');
		} catch (e) {
			const { message } = getError(e, 'Error registering');
			setError(message);
		}
	};

	/**
	 * CHECK BOOK
	 */
	const checkBook = async () => {
		try {
			const data = await getBookData();
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
			<h1>Register</h1>
			<div>
				<input placeholder='Name' type='text' onChange={({ target: { value } }) => setName(value)} />
				<input placeholder='Email' type='text' onChange={({ target: { value } }) => setEmail(value)} />
				<input placeholder='Password' type='text' onChange={({ target: { value } }) => setPassword(value)} />
			</div>
			<br />
			{error && <h5>{error}</h5>}
			<br />
			<button onClick={handleRegister}>Register</button>

			<button onClick={checkBook}>Check Book</button>

			<br />
			<br />
			{bookError && <h5>{bookError}</h5>}
			<br />
		</Layout>
	);
};

export default Register;
