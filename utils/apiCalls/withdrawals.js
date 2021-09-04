import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import { protectedAPICall } from './auth';

/**
 * LIST WITHDRAWALS
 *
 * Get the withdrawals
 * @param {{token, refreshToken}} tokens - Token pair
 * @returns {{ amountDue, orders: [{_id, hasWithdrawn, price, paymentID, customerID, createdAt}] }} - Order
 */
export const getWithdrawals = async tokens => {
	const data = await protectedAPICall({ method: 'get', url: `${DOMAIN}/withdrawals` }, tokens);
	return data;
};
