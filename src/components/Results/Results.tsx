import React from 'react'
import type { Device } from '../../types';
import './Results.css';
interface ResultsProps {
    calculateScore: () => { correct: number; total: number; percentage: number };
    correctAnswers: Record<string, string>;
    userAnswers: Record<string, string>;
    devices: Device[];
}
const Results: React.FC<ResultsProps> = ({ calculateScore, correctAnswers, userAnswers, devices }) => {
    return (
        <section className="results">
            <div className={`score ${calculateScore().percentage >= 75 ? 'correct' : 'incorrect'}`}>
                Score: {calculateScore().correct}/{calculateScore().total} ({calculateScore().percentage}%)
            </div>
            <h3>Investigation Results:</h3>
            <div className="results-details">
                {Object.keys(correctAnswers).map(deviceId => {
                    const device = devices.find(d => d.id === deviceId);
                    const userAnswer = userAnswers[deviceId] || 'No Selection';
                    const correctAnswer = correctAnswers[deviceId];
                    const isCorrect = userAnswer === correctAnswer;

                    return (
                        <div key={deviceId} className="result-item">
                            {isCorrect ? '✅' : '❌'} <strong>{device?.name}:</strong>
                            <span className={isCorrect ? 'correct-answer' : 'incorrect-answer'}>
                                {userAnswer}
                            </span>
                            {!isCorrect && (
                                <div className="correct-answer-display">
                                    Correct answer: <span className="correct-answer">{correctAnswer}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default Results