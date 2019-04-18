const app = require("express")();
const stripe = require("stripe")("pk_test_GMMhmoJNDkVLUtxaz5UmJUtV00iGQ5ZRrA");

app.set("view engine", "pug")

app.use(require("body-parser").urlencoded({extended: false}));

app.get("/", (req, res) => {
res.render("index.pug", {pk_test_GMMhmoJNDkVLUtxaz5UmJUtV00iGQ5ZRrA});
});


app.post("https://localhost:9000/charge", async (req, res) => {
  let amount = 500;
    stripe.customers.create({
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount: amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
    .then(charge => res.render("charge.pug"));
  });
  

    

app.listen(9000);

