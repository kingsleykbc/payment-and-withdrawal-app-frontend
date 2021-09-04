import React, { useState, useRef } from 'react';
import { getError } from '../../../utils/functions';
import Button from '../Button';
import Spacing from '../Spacing';
import { Text } from '../TextComponents';

const AddOrUpdateFieldValue = ({ setView, field, authContext: { userData, updateUser } }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState('');
	const fieldValueRef = useRef();

	const handleFieldUpdate = async e => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await updateUser({ [field]: fieldValueRef.current.value });
			setView('AuthenticateField');
		} catch (e) {
			const { message } = getError(e);
			setErr(message);
			setIsLoading(false);
		}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<div className='AddOrUpdateFieldValue'>
			{/* TITLE */}
			<Spacing padding='15px 0'>
				<Text isLightText isSmallText>
					Enter you {field} below and click 'Next' to proceed.
				</Text>
			</Spacing>

			<form onSubmit={handleFieldUpdate}>
				{/* VALUE */}
				<input
					required
					type={field === 'email' ? 'email' : 'text'}
					ref={fieldValueRef}
					placeholder={field === 'email' ? 'emekaOkafor@example.com' : '+000 0000 000 0000'}
				/>

				{/* ERROR */}
				{err && <h5>{err}</h5>}

				<Spacing padding='20px 0'>
					<Button filled isLoading={isLoading}>
						Next
					</Button>
				</Spacing>
			</form>

			{/* STYLE */}
			<style jsx>{`
				.AddOrUpdateFieldValue {
					text-align: center;
				}

				input {
					text-align: center;
					max-width: 320px;
				}
			`}</style>
		</div>
	);
};

export default AddOrUpdateFieldValue;
