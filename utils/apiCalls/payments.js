import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import { protectedAPICall } from './auth';

/**
 * GET PAYMENT METHODS
 *
 * This endpoint registers the user, gets, and stores the user's token.
 * @param {Number} amount - Amount being charged
 * @param {String} paymentMethodID - Payment method ID
 * @returns {{
 * 	type: "Paystack charge"|"Paystack transfer",
 * 	data: Object,
 * 	amount: {amount, billerFee, amountForBillerCharge, amountAfterFees, totalFee, appFee }
 * }}
 */
export const chargePreviousPayment = async (amount, paymentMethodID) => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/payments/charge`, data: { amount, paymentMethodID } });
	return data;
};
