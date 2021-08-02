import cookie from 'js-cookie';

export const DOMAIN = "http://localhost:8080";
export const HEADER_TOKEN_CONFIG = token => ({ headers: { Authorization: `Bearer ${token || cookie.get("token")}` } });

