const API_KEY = process.env.REACT_APP_STRIPE_SECRET;

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' //Setting the stripe font-end api keys
  ? API_KEY
  : API_KEY;

export default STRIPE_PUBLISHABLE;