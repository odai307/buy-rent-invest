import { useEffect, useState } from "react"
import { Modal, Button, LinearProgress } from "@mui/material"
import axios from "axios"


const QuizModal = ({isOpen, onClose}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const isPreviousDisabled = currentQuestion === 0;
    const isNextDisabled = !userAnswers[currentQuestion];

    // fetch quiz data from the backend
    useEffect(() => {
        if (isOpen) {
            axios.get("http://localhost:5000/api/quiz")
            .then(response => {
                setQuestions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching quiz data", error);
                setLoading(false);
            })
        }
    }, [isOpen])

    
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length -1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion -1);
        }
    }

    const handleAnswerSelect = (answer) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = answer;
        setUserAnswers(newAnswers)
    }


    const handleSubmit = () => {
        // send the answers to the backend for processing
        axios.post("http://localhost:5000/api/quiz/submit", {answers: userAnswers})
        .then((response) => {
            setResult(response.data);
        })
        .catch((error) => {
            console.error("Error Submitting Answers", error);
        })
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
          <div className="p-6 bg-white rounded-lg w-1/3 mx-auto mt-20">
            {loading ? (
                <div>Loading</div>
            ): (<>
                <h2 className="text-xl mb-4">{questions[currentQuestion].question}</h2>
                
                {/* Display options as buttons */}
                {questions[currentQuestion].options.map((option, index) => (
                <Button
                    key={index}
                    variant="outlined"
                    fullWidth
                    className="mb-2"
                    onClick={() => handleAnswerSelect(option)}
                    style={{
                    backgroundColor: userAnswers[currentQuestion] === option ? '#3f51b5' : '',
                    color: userAnswers[currentQuestion] === option ? 'white' : ''
                    }}
                >
                    {option}
                </Button>
                ))}
        
                {/* Progress bar showing quiz progress */}
                <LinearProgress
                variant="determinate"
                value={(currentQuestion / (questions.length - 1)) * 100}
                />
        
                <div className="mt-4 flex justify-between">
                {/* Previous Button */}
                <Button variant="contained" onClick={handlePreviousQuestion} disabled={isPreviousDisabled}>
                Previous
                </Button>
        
                {/* Next Button */}
                <Button variant="contained" color="primary" onClick={currentQuestion < questions.length - 1 ? handleNextQuestion: handleSubmit} className="m1-4" disabled={isNextDisabled}>
                    {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
                </Button>
                </div>
                </>
            )}
          </div>
        </Modal>
      );
    };
    

export default QuizModal
