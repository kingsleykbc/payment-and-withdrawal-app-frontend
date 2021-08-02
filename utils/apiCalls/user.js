import { DOMAIN } from '../config';
import { protectedAPICall } from './auth';


/**
 * GET USER DATA
 * 
 */
export const getUser = async () => {
  const data = await protectedAPICall({ method: "get", url: `${DOMAIN}/customer` });
  console.log("\n.DATA YS \n.\n.\n");
  console.log(data);
  console.log("\n.\n.\n.");
  return data;
}

/**
 * UPDATE  USER DATA
 * 
 */
 export const updateUser = async () => {
  const data = await protectedAPICall({ method: "get", url: `${DOMAIN}/customers` });
  return data;
}