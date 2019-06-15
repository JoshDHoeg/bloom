const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' //Setting The back-end server url's
  ? 'https://bloom-expressapi.herokuapp.com/payment'
  : 'http://localhost:80';

export default PAYMENT_SERVER_URL;