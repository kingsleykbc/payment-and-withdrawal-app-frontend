import cookie from 'js-cookie';

export const DOMAIN = 'http://localhost:8080';
export const HEADER_TOKEN_CONFIG = token => ({ headers: { Authorization: `Bearer ${token || cookie.get('token')}` } });

export const PAYMENT_CONFIG = {
	RATE: 5,
	PHYSICAL_RATE: 2,
	WITHDRAWAL_RATE: 0,
	ADDITIONAL_FEE: 100,
	MIN_AMOUNT_FOR_ADDITIONAL_FEE: 1000
};
