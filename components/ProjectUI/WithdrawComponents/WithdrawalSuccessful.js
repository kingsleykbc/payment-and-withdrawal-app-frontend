import React from 'react';
import ResultPage from '../../UI/ResultPage';

const WithdrawalSuccessful = ({ closeWithdrawal }) => {
	return (
		<ResultPage
			type='success'
			title='Withdrawal successful!'
			subTitle='Your withdrawal has been processed. Depending on your withdrawal method, it may take some time for funds to reflect.'
			onDefaultBottomButtonClick={closeWithdrawal}
			defaultBottomButtonLabel='Continue'
			vPadding='25px'
		/>
	);
};

export default WithdrawalSuccessful;
