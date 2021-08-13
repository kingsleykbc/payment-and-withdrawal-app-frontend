import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import { protectedAPICall } from './auth';

/**
 * CREATE ORDER
 *
 * This endpoint creates a new order.
 * @param {Number} amount - Amount being charged
 * @param {String} paymentMethodID - Payment method ID
 * @returns {{ price, hasWithdrawn, paymentID }} - Order
 */
export const createOrder = async payment => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/orders`, data: { payment } });
	return data;
};
