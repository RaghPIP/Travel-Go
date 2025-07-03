const express = require('express');
const router = express.Router();
const CustomerVisit = require('../models/CustomerVisit');
const auth = require('../middleware/auth');

// Get all customer visits for a user
router.get('/', auth, async (req, res) => {
  try {
    const visits = await CustomerVisit.find({ user: req.user.userId });
    res.json(visits);
  } catch (error) {
    console.error('Error fetching customer visits:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get a specific customer visit
router.get('/:id', auth, async (req, res) => {
  try {
    const visit = await CustomerVisit.findById(req.params.id);
    
    if (!visit) {
      return res.status(404).json({ success: false, message: 'Visit not found' });
    }
    
    // Make sure user owns the visit
    if (visit.user.toString() !== req.user.userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    res.json(visit);
  } catch (error) {
    console.error('Error fetching customer visit:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create a new customer visit
router.post('/', auth, async (req, res) => {
  try {
    const { 
      destination, 
      visitDate, 
      hotelBookings, 
      flightBookings, 
      activities, 
      notes 
    } = req.body;
    
    const newVisit = new CustomerVisit({
      user: req.user.userId,
      destination,
      visitDate,
      hotelBookings: hotelBookings || [],
      flightBookings: flightBookings || [],
      activities: activities || [],
      notes
    });
    
    const savedVisit = await newVisit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    console.error('Error creating customer visit:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update a customer visit
router.put('/:id', auth, async (req, res) => {
  try {
    const { 
      destination, 
      visitDate, 
      hotelBookings, 
      flightBookings, 
      activities, 
      notes 
    } = req.body;
    
    // Find visit and check ownership
    let visit = await CustomerVisit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ success: false, message: 'Visit not found' });
    }
    
    // Make sure user owns the visit
    if (visit.user.toString() !== req.user.userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    // Update visit
    visit = await CustomerVisit.findByIdAndUpdate(
      req.params.id,
      { 
        destination, 
        visitDate, 
        hotelBookings, 
        flightBookings, 
        activities, 
        notes 
      },
      { new: true }
    );
    
    res.json(visit);
  } catch (error) {
    console.error('Error updating customer visit:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a customer visit
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find visit and check ownership
    const visit = await CustomerVisit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ success: false, message: 'Visit not found' });
    }
    
    // Make sure user owns the visit
    if (visit.user.toString() !== req.user.userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    
    await CustomerVisit.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Visit removed' });
  } catch (error) {
    console.error('Error deleting customer visit:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router; 