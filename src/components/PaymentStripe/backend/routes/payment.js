//BLOOMTIME DESIGN 2019
const stripe = require('../constants/stripe'); //Get stripe API

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
      res.json( { status } );
      console.log('What the fuck');
  }catch(err) {
    console.log(err)
    res.status(500).end();
    }
  });

  return app;
};


module.exports = paymentApi;