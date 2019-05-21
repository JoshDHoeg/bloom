var stripe = Stripe('pk_test_7XARlGU7KhB75ysMvpSxfDvG00mtqr7j4s');
var elements = stripe.elements();

// Create an instance of the card UI component
var card = elements.create('card', {
  'style': {
    'base': {
      'fontFamily': 'Arial, sans-serif',
      'fontSize': '8px',
      'color': '#C1C7CD',
    },
    'invalid': {
      'color': 'red',
    },
  }
});

// Mount the UI card component into the `card-element` <div>
card.mount('#card-element');