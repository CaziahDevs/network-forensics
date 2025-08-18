import React from 'react'
import './Submit.css';

interface SubmitProps {
    submitAnswers: () => void;
}

const Submit: React.FC<SubmitProps> = ({ submitAnswers }) => {
    return (
        <button className="submit-btn" onClick={submitAnswers}>
            Submit Investigation Results
        </button>
    )
}

export default Submit