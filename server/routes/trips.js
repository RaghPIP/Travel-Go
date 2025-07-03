const express = require('express');
const router = express.Router();

// Temporary trips storage (replace with MongoDB later)
let trips = [];

// Get all trips
router.get('/', (req, res) => {
  try {
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// Create a new trip
router.post('/', (req, res) => {
  try {
    const { destination, startDate, endDate, activities } = req.body;
    
    const newTrip = {
      id: trips.length + 1,
      destination,
      startDate,
      endDate,
      activities,
      createdAt: new Date()
    };

    trips.push(newTrip);
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip' });
  }
});

// Get trip by ID
router.get('/:id', (req, res) => {
  try {
    const trip = trips.find(t => t.id === parseInt(req.params.id));
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip' });
  }
});

// Update trip
router.put('/:id', (req, res) => {
  try {
    const tripIndex = trips.findIndex(t => t.id === parseInt(req.params.id));
    if (tripIndex === -1) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const updatedTrip = {
      ...trips[tripIndex],
      ...req.body,
      id: trips[tripIndex].id // Preserve the original ID
    };

    trips[tripIndex] = updatedTrip;
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip' });
  }
});

// Delete trip
router.delete('/:id', (req, res) => {
  try {
    const tripIndex = trips.findIndex(t => t.id === parseInt(req.params.id));
    if (tripIndex === -1) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trips = trips.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip' });
  }
});

module.exports = router; 