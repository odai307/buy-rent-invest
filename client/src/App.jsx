import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import QuizModal from './components/QuizModal'

function App() {

  const [showQuiz, setShowQuiz] = useState(false);
  
  const startQuiz = () => {
    setShowQuiz(true);
  }


  return (
    <>
     <LandingPage 
        startQuiz={startQuiz}
     />
     <QuizModal 
      isOpen={showQuiz}
      onClose={() => setShowQuiz(false)}
     />
    </>
  )
}

export default App
