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
    const score = calculateScore();
    const isPassing = score.percentage >= 75;

    return (
        <section className="results">
            <div className="results-header">
                <h2>🔍 FORENSIC ANALYSIS REPORT</h2>
                <div className={`score-badge ${isPassing ? 'passing' : 'failing'}`}>
                    <div className="score-number">{score.correct}/{score.total}</div>
                    <div className="score-percentage">{score.percentage}%</div>
                    <div className="score-label">{isPassing ? 'PROFICIENT' : 'NEEDS IMPROVEMENT'}</div>
                </div>
            </div>

            <div className="investigation-summary">
                <h3>Investigation Summary</h3>
                <div className="summary-stats">
                    <div className="stat-item">
                        <span className="stat-label">Systems Analyzed:</span>
                        <span className="stat-value">{score.total}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Correct Classifications:</span>
                        <span className="stat-value">{score.correct}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Accuracy Rate:</span>
                        <span className="stat-value">{score.percentage}%</span>
                    </div>
                </div>
            </div>

            <div className="device-analysis">
                <h3>Device Classification Results</h3>
                <div className="device-grid">
                    {Object.keys(correctAnswers).map(deviceId => {
                        const device = devices.find(d => d.id === deviceId);
                        const userAnswer = userAnswers[deviceId] || 'unclassified';
                        const correctAnswer = correctAnswers[deviceId];
                        const isCorrect = userAnswer === correctAnswer;

                        return (
                            <div key={deviceId} className={`device-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                                <div className="device-header">
                                    <div className="device-name">{device?.name}</div>
                                    <div className="device-ip">{device?.ip}</div>
                                    <div className={`status-indicator ${isCorrect ? 'correct' : 'incorrect'}`}>
                                        {isCorrect ? '✅' : '❌'}
                                    </div>
                                </div>
                                
                                <div className="classification-info">
                                    <div className="user-classification">
                                        <span className="label">Your Analysis:</span>
                                        <span className={`classification ${userAnswer}`}>
                                            {userAnswer === 'unclassified' ? 'No Selection' : userAnswer.toUpperCase()}
                                        </span>
                                    </div>
                                    
                                    {!isCorrect && (
                                        <div className="correct-classification">
                                            <span className="label">Correct Classification:</span>
                                            <span className={`classification ${correctAnswer}`}>
                                                {correctAnswer.toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="recommendations">
                <h3>Analyst Recommendations</h3>
                {isPassing ? (
                    <div className="recommendation-item success">
                        <span className="rec-icon">🎯</span>
                        <div className="rec-content">
                            <strong>Excellent forensic analysis!</strong> Your classification accuracy demonstrates strong understanding of attack vectors and incident response methodology.
                        </div>
                    </div>
                ) : (
                    <div className="recommendation-item warning">
                        <span className="rec-icon">📚</span>
                        <div className="rec-content">
                            <strong>Continue developing your skills.</strong> Review the forensic evidence more carefully and focus on correlating timeline events with system artifacts.
                        </div>
                    </div>
                )}
                
                <div className="recommendation-item info">
                    <span className="rec-icon">🔄</span>
                    <div className="rec-content">
                        Try analyzing the logs again to improve your incident response skills and pattern recognition.
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Results