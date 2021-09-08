import { DOMAIN } from '../config';
import { protectedAPICall } from './auth';

/**
 * ADD A WITHDRAWAL METHOD
 *
 * @param {'paystack-recipient_nuban'} type - Withdrawal method Type
 * @param {Object} details - Withdrawal method details
 * @returns {{__UpdatedUser}} - Updated User Object
 */
export const addWithdrawalMethod = async (type, details) => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/customers/withdrawalMethods`, data: { type, details } });
	return data;
};

/**
 * DELETE A WITHDRAWAL METHOD
 *
 * @param {String} withdrawalMethodID - Withdrawal method ID
 * @returns {{__UpdatedUser}} - Updated User Object
 */
export const deleteWithdrawalMethod = async withdrawalMethodID => {
	const data = await protectedAPICall({ method: 'delete', url: `${DOMAIN}/customers/withdrawalMethods/${withdrawalMethodID}` });
	return data;
};
