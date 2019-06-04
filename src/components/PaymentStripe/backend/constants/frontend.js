//BLOOMTIME DESIGN 2019

const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ]; //set the development url

const FRONTEND_PROD_URLS = [ 
  'http://www.bloom-userui.herokuapp.com/project',
  'http://bloom-userui.herokuapp.com/project']; //set the production urls

module.exports = process.env.NODE_ENV === 'production' //export constant urls
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;
  