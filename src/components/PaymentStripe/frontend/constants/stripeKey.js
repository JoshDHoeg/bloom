const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' //Setting the stripe font-end api keys
  ? 'pk_live_wke7a6txnW6Zf4KrMKXaqKtA00z106DivU'
  : 'pk_live_wke7a6txnW6Zf4KrMKXaqKtA00z106DivU';

export default STRIPE_PUBLISHABLE;