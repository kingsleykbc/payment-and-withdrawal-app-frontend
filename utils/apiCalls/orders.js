import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import { protectedAPICall } from './auth';

/**
 * LIST ORDERS
 *
 * Get the order details
 * @param {{token, refreshToken}} tokens - Token pair
 * @returns {{ amountDue, orders: [{_id, hasWithdrawn, price, paymentID, customerID, createdAt}] }} - Order
 */
export const getOrders = async tokens => {
	const data = await protectedAPICall({ method: 'get', url: `${DOMAIN}/orders/details` }, tokens);
	return data;
};

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
