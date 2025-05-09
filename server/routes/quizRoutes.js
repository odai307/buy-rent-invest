const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// GET route to fetch quiz questions
router.get('/', quizController.getQuizQuestions);

// POST route to submit answers and get the result
router.post('/submit', quizController.submitAnswers);

module.exports = router;
