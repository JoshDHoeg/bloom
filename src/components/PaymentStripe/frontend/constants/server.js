const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' //Setting The back-end server url's
  ? 'http://bloom-userui.herokuapp.com/payment-api-back'
  : 'http://localhost:80/';

export default PAYMENT_SERVER_URL;