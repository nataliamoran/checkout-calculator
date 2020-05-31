const BASE_URL = window.location.origin.match(/localhost/)
  ? 'http://localhost:5000'
  : window.location.origin;

const API_ROOT = 'api';
export const CART = `${BASE_URL}/${API_ROOT}/cart`;
export const ITEMS = `${BASE_URL}/${API_ROOT}/items`;
