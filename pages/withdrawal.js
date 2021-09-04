import React from 'react';
import Page from '../components/Page';
import WithdrawalPage from '../components/WithdrawalPage';
import { getOrders } from '../utils/apiCalls/orders';
import { getError } from '../utils/functions';
import cookie from 'next-cookies';
import { getWithdrawals } from '../utils/apiCalls/withdrawals';
import withAuth from '../hooks/withAuth';

const withdrawal = props => {
	return (
		<Page props={props}>
			<WithdrawalPage data={props.data} />
		</Page>
	);
};

export default withAuth(withdrawal);

withdrawal.getInitialProps = async ctx => {
	try {
		const tokens = cookie(ctx);
		const orders = await getOrders(tokens);
		const withdrawals = await getWithdrawals(tokens);
		return { data: { orders, withdrawals } };
	} catch (e) {
		return { error: { ...getError(e, { useAppErrorMessage: true }) } };
	}
};
