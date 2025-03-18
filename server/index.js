const express = require('express');
const app = express();

const { 
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  fetchReservations,
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
  ]);
  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());


  const [reservation1, reservation2, reservation3] = await Promise.all([
    createReservation({
      date: '2025-03-18',
      party_count: 2,
      restaurant_id: diner.id,
      customer_id: moe.id
    }),
    createReservation({
      date: '2025-04-01',
      party_count: 4,
      restaurant_id: bistro.id,
      customer_id: lucy.id
    }),
    createReservation({
      date: '2025-05-12',
      party_count: 6,
      restaurant_id: steakhouse.id,
      customer_id: larry.id
    }),
  ]);
  console.log(await fetchReservations());

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  })
}
init();