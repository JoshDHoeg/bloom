const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' //Setting The back-end server url's
  ? 'http://app.bloomtimedesign.co'
  : 'http://localhost:8080/';

export default PAYMENT_SERVER_URL;