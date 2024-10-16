const { Router } = require('express');

const router = Router();
const Itinerary = require('../models/itinerary');

router.get('/', async (req, res, next) => {
  try {
    const tripId = req.query.trip_id;
    const itineraries = await Itinerary.find({ trip_id: tripId });
    res.json(itineraries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const itinerary = new Itinerary(req.body);
    const createditinerary = await itinerary.save();
    res.json(createditinerary);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/update', async (req, res, next) => {
  try {
    const updatedItinerary = req.body;
    const itineraryId = req.query.itinerary_id;

    const itinerary = await Itinerary.findOne({ _id: itineraryId });
    await itinerary.updateOne(updatedItinerary);
    const itineraries = await Itinerary.find({ trip_id: req.body.trip_id });
    res.json(itineraries);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    await Itinerary.deleteOne({ _id: id });
    res.status(200);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
