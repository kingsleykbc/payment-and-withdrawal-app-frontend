import { DOMAIN } from '../config';
import { protectedAPICall } from './auth';

/**
 * GET PAYMENT DETAILS
 *
 * @param {String} key - keyType value
 * @param {"paymentID"|"receiptNo"} keyType - keyType to find the payment
 * @returns
 */
export const getPaymentDetails = async (key, keyType = 'paymentID') => {
	const data = await protectedAPICall({
		method: 'get',
		url: `${DOMAIN}/payments/details/${key}?keyType=${keyType}`
	});
	return data;
};

/**
 * GET PAYMENT METHODS
 *
 * This endpoint registers the user, gets, and stores the user's token.
 * @param {Number} amount - Amount being charged
 * @param {String} paymentMethodID - Payment method ID
 * @returns {{
 * 	method: "Paystack charge"|"Paystack transfer",
 * 	data: Object,
 * 	amount: {amount, billerFee, amountForBillerCharge, amountAfterFees, totalFee, appFee },
 * 	provider: "paystack"
 * }}
 */
export const chargePreviousPayment = async (amount, paymentMethodID) => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/payments/charge`, data: { amount, paymentMethodID } });
	return data;
};
