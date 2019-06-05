const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production' //Setting The back-end server url's
  ? 'https://bloom-userui.herokuapp.com/project'
  : 'http://localhost:80/';

export default PAYMENT_SERVER_URL;