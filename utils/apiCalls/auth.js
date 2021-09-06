import axios from 'axios';
import cookie from 'js-cookie';
import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import Router from 'next/router';
import { getError } from '../functions';

/**
 * REGISTER USER
 *
 * This endpoint registers the user, gets, and stores the user's token.
 */
export const registerUser = async data => {
	const {
		data: { accessToken, refreshToken }
	} = await axios.post(`${DOMAIN}/auth/register`, data);

	// Setup cookie
	cookie.set('token', accessToken, { expires: 30 });
	cookie.set('refreshToken', refreshToken, { expires: 30 });

	// Return token
	return accessToken;
};

/**
 * LOGIN USER
 * This endpoint registers the user, gets, and stores the user's token.
 */
export const loginUser = async (data, nextPage = '/', navAfterLogin = true) => {
	const {
		data: { accessToken, refreshToken }
	} = await axios.post(`${DOMAIN}/auth/login`, data);

	// Setup cookie
	cookie.set('token', accessToken, { expires: 30 });
	cookie.set('refreshToken', refreshToken, { expires: 30 });

	if (navAfterLogin) Router.push(nextPage);

	// Return token (Normally, you would return user data or message)
	return { accessToken, refreshToken };
};

/**
 * LOGOUT
 *
 * This request redirects the user back to the login screen (if not disabled), sends the logout request to delete
 * the token from the server and removes the access and refresh tokens.
 */
export const logout = rdir => {
	axios.delete(`${DOMAIN}/auth/logout`);
	cookie.remove('token');
	cookie.remove('refreshToken');
	localStorage.setItem('logout', Date.now());

	if (rdir !== false) Router.push('/login');
};

/**
 * SEND AN OTP EMAIL
 *
 * @returns {{message, token}} - Hashed token with code
 */
export const sendOTPEmailVerification = async () => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/auth/otp/verification/email` });
	return data;
};

/**
 * VALIDATE OTP EMAIL
 *
 * @param {String} token - Hashed token with code
 * @param {String} otp - 6-digit code
 * @returns {{message: 'Email successfully Verified!'}} - Confirmation message
 */
export const validateOTPEmailVerification = async (token, otp) => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/auth/otp/verification/email/validate`, data: { token, otp } });
	return data;
};

/**
 * SEND AN OTP WHATSAPP MESSAGE
 *
 * @returns {{message, token}} - Hashed token with code
 */
export const sendOTPWhatsAppVerification = async () => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/auth/otp/verification/whatsapp` });
	return data;
};

/**
 * VALIDATE OTP WHATSAPP
 *
 * @param {String} token - Hashed token with code
 * @param {String} otp - 6-digit code
 * @returns {{message: 'Phone number successfully Verified!'}} - Confirmation message
 */
export const validateOTPWhatsAppVerification = async (token, otp) => {
	const data = await protectedAPICall({ method: 'post', url: `${DOMAIN}/auth/otp/verification/whatsapp/validate`, data: { token, otp } });
	return data;
};

// ===================================================================================================================
// 	PROTECTED API CALLS
// ===================================================================================================================
/**
 * MAKE PROTECTED API CALLS
 * This is a wrapper for protected API calls. It sends the request with the access token, checks if the access
 * token is expired and requests a refresh token if so. It also sends appropriate error messages and logs out
 * if the refresh token is expired.
 *
 * @param {{method, url, data}} reqObj - The axios refresh object => {method, url, data}
 * @param {{accessToken, refreshToken}} tokens - The token (optional) especially if it was called before rendering the DOM
 * @param {Boolean} redirectOnFail - If user should redirect back to the login screen upon detecting invalid refresh token
 * @returns {Object} - Data of request
 */
export const protectedAPICall = async (reqObj, tokens = {}, redirectOnFail) => {
	// Verify the tokens
	const token = tokens.token || cookie.get('token');
	const refreshToken = tokens.refreshToken || cookie.get('refreshToken');

	if (!token || !refreshToken) {
		logout(redirectOnFail);
		throw Error('Unauthorized');
	}

	// Handle the protected request
	try {
		const { data } = await axios({ ...reqObj, headers: HEADER_TOKEN_CONFIG(token).headers });
		return data;
	} catch (e) {
		const errMessage = getError(e).message;

		// Refresh token if expired and retry the request
		if (errMessage === 'jwt expired') {
			try {
				const newAccessToken = await refreshAccessToken(refreshToken);
				cookie.set('token', newAccessToken, { expires: 30 });

				// Retry request
				return await protectedAPICall(reqObj, { token: newAccessToken, refreshToken }, redirectOnFail);
			} catch (e) {
				// Logout if refresh token is invalid
				if (errMessage === 'Unauthorized') logout(redirectOnFail);
				throw e;
			}
		}

		// Logout if token invalid and throw the jwt or api call error
		else if (errMessage === 'Unauthorized') logout(redirectOnFail);
		throw e;
	}
};

/**
 * REFRESH THE ACCESS TOKEN
 * This function simply refreshes and returns the access token.
 */
export const refreshAccessToken = async refreshToken => {
	const {
		data: { newAccessToken }
	} = await axios.post(`${DOMAIN}/auth/refreshToken`, { refreshToken });
	return newAccessToken;
};
