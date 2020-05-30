// defaults to local server (started by running `npm run server`)
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const API_ROOT = 'api';
export const CART = `${BASE_URL}/${API_ROOT}/cart`;
export const ITEMS = `${BASE_URL}/${API_ROOT}/items`;
