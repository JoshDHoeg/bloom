//BLOOMTIME DESIGN 2019

const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ]; //set the development url

const FRONTEND_PROD_URLS = [ //set the production url
  'https://bloom-prod.herokuapp.com/',
  'https://bloom-prod.herokuapp.com/project'
];

module.exports = process.env.NODE_ENV === 'production' //export constant urls
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;