import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import { protectedAPICall } from './auth';

/**
 * GET PAYMENT METHODS
 *
 * This endpoint registers the user, gets, and stores the user's token.
 */
export const getPaymentMethods = async () => {
	const data = await protectedAPICall({ method: 'get', url: `${DOMAIN}/books` });
	return data;
};

export const deletePaymentMethod = async paymentMethodID => {
	const data = await protectedAPICall({ method: 'delete', url: `${DOMAIN}/customers/paymentMethods/${paymentMethodID}` });
	return data;
};
