// API routes
const router = require('express').Router();
const client = require('./db');

// router - localhost:3000/api
router.get('/api/customers', async (req, res, next) => {
  try {
    res.send(await fetchCustomers());
  } catch (error) {
    next(error);
  }
});

router.get('/api/restaurants', async (req, res, next) => {
  try {
    res.send(await fetchRestaurants());
  } catch (error) {
    next(error);
  }
});

router.get('/api/reservations', async (req, res, next) => {
  try {
    res.send(await fetchReservations());
  } catch (error) {
    next(error);
  }
});

router.post('/api/customers/:customer_id/reservations', async (req, res, next) => {
  try {
    res.status(201).send(await createReservation({
      date: req.body.date,
      party_count: req.body.party_count,
      restaurant_id: req.body.restaurant_id,
      customer_id: req.params.customer_id
    }));
  } catch (error) {
    next(error);
  }
});

router.delete('/api/customers/:customer_id/reservations/:id', async (req, res, next) => {
  try {
    await destroyReservation({
      id: req.params.id,
      customer_id: req.params.customer_id
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// export router
module.exports = router;