<<<<<<< HEAD
# Travel&Go - Travel Planning Website

Travel&Go is a modern travel planning website built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It helps users plan their trips with features like destination search, trip planning, AI-based itinerary suggestions, and more.

## Features

- User Authentication (Login/Register)
- Destination Search
- Trip Planning with Calendar
- AI-Based Itinerary Suggestions
- Chatbot Assistant
- Weather Forecast
- Budget Estimator
- Save & Share Trips
- Customer Visit Tracking (Hotel Bookings, Flight Bookings, Activities, Total Spending)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (for production)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travel-and-go
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

## Running the Application

1. Start the backend server:
```bash
# From the root directory
npm run dev
```

2. Start the frontend development server:
```bash
# From the client directory
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Trips
- `GET /api/trips` - Get all trips for a user
- `POST /api/trips` - Create a new trip
- `PUT /api/trips/:id` - Update a trip
- `DELETE /api/trips/:id` - Delete a trip

### Customer Visits
- `GET /api/customer-visits` - Get all customer visits for a user
- `GET /api/customer-visits/:id` - Get a specific customer visit
- `POST /api/customer-visits` - Create a new customer visit
- `PUT /api/customer-visits/:id` - Update a customer visit
- `DELETE /api/customer-visits/:id` - Delete a customer visit

## Project Structure

```
travel-and-go/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main App component
├── models/                # MongoDB models
│   ├── User.js           # User model
│   ├── Trip.js           # Trip model
│   └── CustomerVisit.js  # Customer visit model
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   ├── trips.js          # Trip routes
│   └── customerVisits.js # Customer visit routes
├── middleware/            # Middleware functions
│   └── auth.js           # Authentication middleware
├── server.js              # Express server
├── package.json           # Backend dependencies
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
