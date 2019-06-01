const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' //Setting The back-end server url's
  ? 'http://app.bloomtimedesign.co/project'
  : 'http://localhost:8080/';

export default PAYMENT_SERVER_URL;