import { PAYMENT_CONFIG } from './config';

/**
 * GET ERROR MESSAGE AND OTHER DETAILS FROM RESPONSE
 *
 * @param {Error} e - Error object
 * @param {String} defaultMessage - Default message to display
 * @returns {{message, appErrorMessage, type, code, fields}} - Error details
 */
export const getError = (e, defaultMessage) => {
	// Setup default
	const error = {
		message: e.message === 'Network Error' ? 'Network error, please try again.' : defaultMessage || 'Error getting data',
		appErrorMessage: e.message,
		type: 'Application error',
		code: 500,
		fields: {}
	};

	// Catch server response errors
	if (e.response && e.response.data) {
		const { message, type, errors, code } = e.response.data;
		error.message = message;
		error.type = type;
		error.code = code;
		if (errors) error.fields = errors;
	}

	// Return error
	// console.log({ error: e.message, response: error }); // (Comment out when not in use)
	return error;
};

/**
 * WORD SLICER
 */
export function slicer(word, maxLength) {
	if (!word) return '';
	if (word.length > maxLength) return word.slice(0, maxLength) + '...';
	else return word;
}

const { RATE, WITHDRAWAL_RATE, ADDITIONAL_FEE, MIN_AMOUNT_FOR_ADDITIONAL_FEE } = PAYMENT_CONFIG;

/**
 * CALCULATE THE TRANSACTION FEES OF A PAYMENT
 *
 * @param {Number} amount - Amount (in naira)
 * @param {"withdrawal"|"payment"|"physical payment"} type - Type of payment (withdrawal or charge/payment)
 * @param {"paystack"|"physical"} provider - Biller
 * @param {{inKobo: Boolean}} options - Options
 * @returns {{amount, billerFee, amountForBillerCharge, amountAfterFees, totalFee, appFee }}
 */
export const getTransactionFee = (amount, type, provider, options = {}) => {
	const totalFee = getTotalTransactionFee(type, amount);
	let billerFee;
	if (options.inKobo) amount = amount * 100;

	switch (provider) {
		case 'paystack': {
			billerFee = getPaystackTransactionFee(type, amount);
			break;
		}
		default: {
			billerFee = 0; // For physical payments
		}
	}

	if (billerFee > totalFee) totalFee = billerFee;
	const appFee = totalFee - billerFee;
	return {
		amount,
		billerFee,
		totalFee,
		appFee,
		amountForBillerCharge: type === 'withdrawal' ? amount - appFee : amount,
		amountAfterFees: amount - totalFee
	};
};

/**
 * GET THE TRANSACTION FEE
 *
 * @param {"withdrawal"|"payment"|"physical payment"} type - Type of transaction (outgoing = transfer, incoming = charge)
 * @param {Number} amount - Amount (in naira)
 * @returns {Number} - Paystack fee
 */
export const getTotalTransactionFee = (type, amount) => {
	let fee = 0;
	switch (type) {
		case 'payment':
			if (amount > MIN_AMOUNT_FOR_ADDITIONAL_FEE) fee += ADDITIONAL_FEE;
			fee += amount * (RATE / 100);
			break;
		case 'physical payment':
			fee += amount * (PHYSICAL_RATE / 100);
			break;
		case 'withdrawal':
			fee += amount * (WITHDRAWAL_RATE / 100);
			break;
	}
	return fee;
};

/**
 * GET THE TRANSACTION FEE OF A PAYSTACK TRANSACTION
 *
 * @param {"withdrawal"|"payment"|"physical payment"} type - Type of transaction (outgoing = transfer, incoming = charge)
 * @param {Number} amount - Amount (in naira)
 * @returns {Number} - Paystack fee
 */
export const getPaystackTransactionFee = (type, amount) => {
	let fee = 0;
	switch (type) {
		case 'payment':
			if (amount >= 2500) fee += 100;
			fee += amount * 0.015;
			break;
		case 'withdrawal':
			fee += amount <= 5000 ? 10 : amount > 5000 && amount <= 50000 ? 25 : 50;
			break;
	}
	return fee;
};
