const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

// Get all trips for a user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.userId });
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create a new trip
router.post('/', auth, async (req, res) => {
  try {
    const { destination, startDate, endDate, interests } = req.body;
    
    const newTrip = new Trip({
      user: req.user.userId,
      destination,
      startDate,
      endDate,
      interests
    });
    
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update a trip
router.put('/:id', auth, async (req, res) => {
  try {
    const { destination, startDate, endDate, interests, status } = req.body;
    
    // Find trip and check ownership
    let trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    // Make sure user owns the trip
    if (trip.user.toString() !== req.user.userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    // Update trip
    trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { destination, startDate, endDate, interests, status },
      { new: true }
    );
    
    res.json(trip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a trip
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find trip and check ownership
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    // Make sure user owns the trip
    if (trip.user.toString() !== req.user.userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Trip removed' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router; 