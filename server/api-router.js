const { Router } = require('express');


const routes = Router();

// default cart : empty state
let cart = {
  items: [],
  discountRate: 0,
  summary: {
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
  },
};

routes.get('/cart', (req, res) => {
  res.status(200).json(cart);
});

routes.put('/cart', (req, res) => {
  const { items } = req.body;
  const discountRate = req.body.discountRate || 0;

  const subtotal = items.reduce(
    (acc, item) => acc + (item.quantity * item.value),
    0,
  );

  // for now, assume tax rate is always 13%
  const taxRate = 0.13;
  const discount = subtotal * discountRate;
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax;
  const summary = {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };

  cart = { items, discountRate, summary };
  res.status(200).json(cart);
});

routes.get('/items', (req, res) => {
  const items = [
    {
      id: 1,
      label: 'Apple, Gala (1 lb)',
      value: 0.79,
      imageUrl: 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg',
      quantity: 0,
    },
    {
      id: 2,
      label: 'Pear, Anjou (1 lb)',
      value: 1.13,
      imageUrl: 'https://i5.walmartimages.ca/images/Large/799/2_r/6000196087992_R.jpg',
      quantity: 0,
    },
    {
      id: 3,
      label: 'Orange, Seedless (Bag of 4)',
      value: 6.97,
      imageUrl: 'https://i5.walmartimages.ca/images/Large/110/004/999999-33383110004.jpg',
      quantity: 0,
    },
    {
      id: 4,
      label: 'Grapes, Red Seedless (1 lb)',
      value: 2.97,
      imageUrl: 'https://i5.walmartimages.ca/images/Large/110/004/999999-33383110004.jpg',
      quantity: 0,
    },
    {
      id: 5,
      label: 'Banana, Organic (single)',
      value: 0.28,
      imageUrl: 'https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
      quantity: 0,
    },
  ];

  res.status(200).json(items);
});

module.exports = routes;
