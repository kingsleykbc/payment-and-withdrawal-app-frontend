import axios from 'axios';
import { DOMAIN, HEADER_TOKEN_CONFIG } from '../config';
import { protectedAPICall } from './auth';


/**
 * CHECK BOOKS
 * This endpoint registers the user, gets, and stores the user's token.
 */
export const getBookData = async () => {
  const data = await protectedAPICall({ method: "get", url: `${DOMAIN}/books` });
  return data;
}