import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import { protectedAPICall } from './auth';

/**
 * GET PAYMENT METHODS
 *
 * This endpoint registers the user, gets, and stores the user's token.
 * @returns {[{_id, category, details: {__PaymentMethodDetails}}]}
 */
export const getPaymentMethods = async () => {
	const data = await protectedAPICall({ method: 'get', url: `${DOMAIN}/books` });
	return data;
};

/**
 * ADD A PAYMENT METHOD
 *
 * This endpoint saves the payment auth of a paystack payment that was just made.
 * @param {"paystack-authorization"} type - Payment method type (Can't add _bank or _card because its unknown).
 * @param {{reference}|{__OtherTypeDetails}} details - Payment method details.
 * @returns {{__UpdatedUser}} - Updated User Object.
 */
export const savePaymentMethod = async (type, details) => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/customers/paymentMethods`, data: { type, details } });
	return data;
};

/**
 * DELETE A PAYMENT METHOD
 *
 * @param {String} paymentMethodID - Payment method ID
 * @returns {{__UpdatedUser}} - Updated User Object
 */
export const deletePaymentMethod = async paymentMethodID => {
	const data = await protectedAPICall({ method: 'delete', url: `${DOMAIN}/customers/paymentMethods/${paymentMethodID}` });
	return data;
};
