const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' //Setting the stripe font-end api keys
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_7XARlGU7KhB75ysMvpSxfDvG00mtqr7j4s';

export default STRIPE_PUBLISHABLE;