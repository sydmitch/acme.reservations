const express = require('express');
const app = express();

const { 
  client,
  createTables,
  // createCustomer,
  // createRestaurant,
  // fetchCustomers,
  // fetchRestaurants,
  // createReservation,
  // destroyReservation,
} = require('./db');

// API routes





// initialize server
const init = async () => {
  console.log("Connecting to the database...");
  await client.connect();
  console.log("Connected to the database!");
  await createTables();
  console.log("Tables created.");
  const [moe, lucy, larry, ethyl, fred, sarah, joe, curly, betty, 
    diner, bistro, steakhouse
  ] = await Promise.all([
    createCustomer({ name: 'moe'}),
    createCustomer({ name: 'lucy'}),
    createCustomer({ name: 'larry'}),
    createCustomer({ name: 'ethyl'}),
    createCustomer({ name: 'fred'}),
    createCustomer({ name: 'sarah'}),
    createCustomer({ name: 'joe'}),
    createCustomer({ name: 'curly'}),
    createCustomer({ name: 'betty'}),
    createRestaurant({ name: 'diner'}),
    createRestaurant({ name: 'bistro'}),
    createRestaurant({ name: 'steakhouse'}),
  ])


  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  })
}
init();