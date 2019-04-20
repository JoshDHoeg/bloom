const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' //Setting the stripe font-end api keys
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_GMMhmoJNDkVLUtxaz5UmJUtV00iGQ5ZRrA';

export default STRIPE_PUBLISHABLE;