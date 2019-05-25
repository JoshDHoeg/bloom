//BLOOMTIME DESIGN 2019
const stripe = require('../constants/stripe'); //Get stripe API

const charge = res => (stripeErr, stripeRes) => { //Charge the stripe token in the back-end
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}
const paymentApi = app => { //Access the back-end
  app.get('/', (req, res,) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });
  app.post('/', async (req, res) => { //Post the charge
    try{
      let { status } = await stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        description: "Charge",
        source: req.body.token
        });
      res.json( {status } );
  }catch(err) {
    console.log(err)
    res.status(500).end();
    }
  });

  return app;
};


module.exports = paymentApi;