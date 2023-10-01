import { DOMAIN } from '../config';
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

/**
 * INITIALIZE WITHDRAW FUNDS
 *
 * Initialize order withdrawal and return the initialization object.
 * @param {String} withdrawalMethodID - Selected withdrawal method ID
 * @returns {{
 * 	message,
 * 	paymentMethod,
 * 	withdrawalMethodID,
 * 	payment: {amount, transactionFee, billerTransactionFee},
 * 	data: {__BillerInitializationFields}
 * }} - Withdrawal Initialization
 */
export const initializeFundsWithdrawal = async withdrawalMethodID => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/orders/withdrawFunds/initialize/${withdrawalMethodID}` });
	return data;
};

/**
 * INITIALIZE WITHDRAW FUNDS
 *
 * Finalize an initialization.
 * @param {{__BillerInitializationValue}} authData - Auth data
 * @param {{
 * 	message,
 * 	paymentMethod,
 * 	withdrawalMethodID,
 * 	payment: {amount, transactionFee, billerTransactionFee},
 * 	data: {__BillerInitializationFields}
 * }} initialization - Withdrawal Initialization *
 *
 * @returns {{
 * 	message,
 * 	withdrawalDetails: {withdrawalMethodID, payment: {__PaymentData}}
 * }} - Withdrawal details (equivalent of {method, data} for payment)
 */
export const finalizeFundsWithdrawal = async (initialization, authData, authField) => {
	const data = await protectedAPICall({
		method: 'post',
		url: `${DOMAIN}/orders/withdrawFunds/finalize`,
		data: { initialization, authData, authField }
	});
	return data;
};

/**
 * WITHDRAW FUNDS
 *
 * This function creates the withdrawal object from a finalized withdrawalDetails object.
 * @param {{withdrawalMethodID, payment: {__PaymentData}}} withdrawalDetails - Withdrawal details
 * @param {{email}|{phoneNumber}} authField - OTP authenticated field
 * @returns {{ __WithdrawalData }} - Stored withdrawal
 */
export const withdrawFunds = async (withdrawalDetails, authField) => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/orders/withdrawFunds`, data: { withdrawalDetails, authField } });
	return data;
};

/**
 * INITIALIZE WITHDRAW FUNDS
 *
 * This function combines the finalizeWithdrawal and withdrawFunds functions above.
 * @param {{__BillerInitializationValue}} authData - Auth data
 * @param {{email}|{phoneNumber}} authField - OTP authenticated field
 * @param {{
 * 	message,
 * 	paymentMethod,
 * 	withdrawalMethodID,
 * 	payment: {amount, transactionFee, billerTransactionFee},
 * 	data: {__BillerInitializationFields}
 * }} initialization - Withdrawal Initialization
 *
 * @returns {{
 * 	message,
 * 	withdrawalDetails: {withdrawalMethodID, payment: {__PaymentData}}
 * }} - Withdrawal details (equivalent of {method, data} for payment)
 */
export const finishWithdrawal = async (initialization, authData, authField) => {
	const { withdrawalDetails } = await finalizeFundsWithdrawal(initialization, authData);
	const withdrawal = await withdrawFunds(withdrawalDetails, authField);
	return withdrawal;
};
