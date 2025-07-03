const mongoose = require('mongoose');

const CustomerVisitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  },
  hotelBookings: [{
    hotelName: {
      type: String,
      required: true
    },
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
    },
    roomType: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  }],
  flightBookings: [{
    airline: {
      type: String,
      required: true
    },
    flightNumber: {
      type: String,
      required: true
    },
    departureDate: {
      type: Date,
      required: true
    },
    arrivalDate: {
      type: Date,
      required: true
    },
    departureCity: {
      type: String,
      required: true
    },
    arrivalCity: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  }],
  activities: [{
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    cost: {
      type: Number,
      required: true
    }
  }],
  totalSpending: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total spending before saving
CustomerVisitSchema.pre('save', function(next) {
  let total = 0;
  
  // Add hotel costs
  this.hotelBookings.forEach(booking => {
    total += booking.cost;
  });
  
  // Add flight costs
  this.flightBookings.forEach(booking => {
    total += booking.cost;
  });
  
  // Add activity costs
  this.activities.forEach(activity => {
    total += activity.cost;
  });
  
  this.totalSpending = total;
  next();
});

module.exports = mongoose.model('CustomerVisit', CustomerVisitSchema); 