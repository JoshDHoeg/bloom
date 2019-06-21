const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' //Setting The back-end server url's to send to payment server
  ? 'https://bloom-expressapi.herokuapp.com/payment'
  : 'http://localhost:8080/payment';

export default PAYMENT_SERVER_URL;