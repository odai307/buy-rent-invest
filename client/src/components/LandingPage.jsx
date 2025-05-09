import React from 'react'
import { Button } from '@mui/material'

const LandingPage = ({startQuiz}) => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">
          Not sure whether to Rent, Buy, or Invest? Take the quiz!
        </h1>
        <Button variant="contained" color="primary" onClick={startQuiz}>
          Take The Game
        </Button>
    
      </div>
  )
}

export default LandingPage
