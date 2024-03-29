import { DOMAIN } from '../config';
import { protectedAPICall } from './auth';

/**
 * GET USER DATA
 */
export const getUser = async () => {
	const data = await protectedAPICall({ method: 'get', url: `${DOMAIN}/customer` });
	return data;
};

/**
 * UPDATE  USER DATA
 */
export const updateUser = async data => {
	const updatedUser = await protectedAPICall({ method: 'put', url: `${DOMAIN}/customer`, data });
	return updatedUser;
};
