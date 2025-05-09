const fs = require('fs');
const path = require('path');

// Read quiz questions from local JSON file
const quizData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/quiz.json')));

// Function to get quiz questions
const getQuizQuestions = (req, res) => {
  res.json(quizData);
};

// Function to handle quiz result calculation (based on answers)
const submitAnswers = (req, res) => {
  const answers = req.body.answers; // Array of user answers

  let scores = { rent: 0, buy: 0, invest: 0 };

  answers.forEach((answer, index) => {
    switch (index) {
      case 0:
        if (answer === quizData[0].options[0]) scores.rent += 2;
        if (answer === quizData[0].options[1]) {
          scores.rent += 1;
          scores.buy += 1;
        }
        if (answer === quizData[0].options[2]) {
          scores.buy += 2;
          scores.invest += 1;
        }
        break;

      case 1:
        if (answer === quizData[1].options[0]) scores.rent += 2;
        if (answer === quizData[1].options[1]) scores.buy += 2;
        if (answer === quizData[1].options[2]) scores.invest += 2;
        break;

      case 2:
        if (answer === quizData[2].options[0]) scores.rent += 2;
        if (answer === quizData[2].options[1]) scores.buy += 2;
        if (answer === quizData[2].options[2]) scores.invest += 2;
        break;

      case 3:
        if (answer === quizData[3].options[0]) scores.rent += 2;
        if (answer === quizData[3].options[1]) scores.buy += 2;
        if (answer === quizData[3].options[2]) scores.invest += 2;
        break;

      case 4:
        if (answer === quizData[4].options[0]) scores.rent += 2;
        if (answer === quizData[4].options[1]) {
          scores.buy += 1;
          scores.invest += 1;
        }
        if (answer === quizData[4].options[2]) scores.invest += 2;
        break;
    }
  });

  // Determine the result
  const result = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  res.json({
    result,
    message: `You should ${result.toUpperCase()}!`,
  });
};

module.exports = { getQuizQuestions, submitAnswers };
