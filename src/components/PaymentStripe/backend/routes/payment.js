//BLOOMTIME DESIGN 2019

const stripe = require('../constants/stripe'); //Get stripe API

const postStripeCharge = res => (stripeErr, stripeRes) => { //Charge the stripe token in the back-end
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

<<<<<<< HEAD


=======
>>>>>>> 56a5ed899c5775f76634bc9d54ec44514c16956c
const paymentApi = app => { //Access the back-end
  app.get('/', (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  app.post('/', (req, res) => { //Post the charge
    stripe.charges.create(req.body, postStripeCharge(res));
  });

  return app;
};

module.exports = paymentApi;