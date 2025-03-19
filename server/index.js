const express = require('express');
const app = express();
const apiRouter = require('./api');

const { 
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  fetchReservations,
  destroyReservation,
} = require('./db');

// middleware
app.use(express.json());

app.use('/api', apiRouter);


app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: error.message || err});
});


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
    createCustomer('moe'),
    createCustomer('lucy'),
    createCustomer('larry'),
    createCustomer('ethyl'),
    createCustomer('fred'),
    createCustomer('sarah'),
    createCustomer('joe'),
    createCustomer('curly'),
    createCustomer('betty'),
    createRestaurant('diner'),
    createRestaurant('bistro'),
    createRestaurant('steakhouse'),
  ]);
  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());


  const [reservation, reservation2, reservation3] = await Promise.all([
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
  if (reservation) {
    await destroyReservation({ id: reservation.id, customer_id: reservation.customer_id });
  }
  console.log(await fetchReservations());

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
    console.log('some curl commands to test');
    console.log(`curl localhost:${port}/api/customers`);
    console.log(`curl localhost:${port}/api/restaurants`);
    console.log(`curl localhost:${port}/api/reservations`);
    console.log(`curl -X DELETE localhost:${port}/api/customers/${moe.id}/reservations/${reservation2.id}`);
    console.log(`curl -X POST localhost:${port}/api/customers/${moe.id}/reservations -d '{"date": "2025-06-01", "party_count": 2, "restaurant_id": "${diner.id}"}' -H "Content-Type: application/json"`);
  });
}
init();