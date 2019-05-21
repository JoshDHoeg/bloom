//BLOOMTIME DESIGN 2019
const stripe = require('../constants/stripe'); //Get stripe API


const postStripeCharge = res => (stripeErr, stripeRes) => { //Charge the stripe token in the back-end
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

const paymentApi = app => { //Access the back-end
  app.get('/', (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  app.post('/', async (req, res,) => { //Post the charge
    try{
      let { status } = await stripe.charges.create({
        amount: 59999,
        currency: "usd",
        description: "Charge",
        source: req.body
      });

      res.json( {status });
  }catch(err) {
     res.status(500).end();
    }
  });

  return app;
};

module.exports = paymentApi;