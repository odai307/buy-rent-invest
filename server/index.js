const express = require('express');
const cors = require('cors');
const path = require('path');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests (for frontend React app)
app.use(express.json()); // Parse incoming JSON requests

// Serve static files (if needed for production later)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/quiz', quizRoutes); // All quiz-related routes will be prefixed with /api/quiz

// Default Route (optional)
app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
