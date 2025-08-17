import React, { useState } from 'react';
import './App.css';

// Types
import type { Device, DeviceStatus, Scenario, DeviceLog } from './types';

// Mock data for now - we'll move this to a separate file later
const mockDevices: Device[] = [
  { id: 'eng-ws01', name: 'ENG-WS01', ip: '192.168.1.10', department: 'engineering' },
  { id: 'eng-ws02', name: 'ENG-WS02', ip: '192.168.1.11', department: 'engineering' },
  { id: 'rd-ws01', name: 'RD-WS01', ip: '192.168.2.10', department: 'rd' },
  { id: 'rd-ws02', name: 'RD-WS02', ip: '192.168.2.11', department: 'rd' },
];

const mockLogs: Record<string, DeviceLog> = {
  'eng-ws01': {
    title: 'ENG-WS01 Vulnerability Scan Results',
    content: `Nessus Vulnerability Scanner v10.4.2
Scan Date: 2025-06-06 14:23:15
Target: 192.168.1.10 (ENG-WS01)

[INFO] Scan initiated...
[INFO] Host is alive and responding
[INFO] OS Detection: Windows 10 Enterprise (Build 19043)

=== VULNERABILITY SUMMARY ===
Critical: 0
High: 0  
Medium: 2
Low: 3

[INFO] Scan completed successfully
[RESULT] SYSTEM APPEARS CLEAN`,
    timestamp: '2025-06-06 14:23:15'
  },
  firewall: {
    title: 'Firewall Traffic Analysis - FW-CORE-01',
    content: `Palo Alto Networks Traffic Log Analysis
Timeframe: 2025-06-05 09:00 - 2025-06-06 15:00
Filter: Suspicious/High-Risk Traffic

=== TIMELINE OF EVENTS ===

2025-06-05 09:42:15 | ALLOW | 192.168.2.11 → 198.51.100.45:80
  Protocol: HTTP | App: web-browsing | User: rduser2
  URL: suspicious-update-site[.]com/download.php
  Action: ALLOW (Initial compromise vector)

RECOMMENDATION: Isolate infected systems immediately`,
    timestamp: '2025-06-06 15:00:00'
  }
};

const mockCorrectAnswers: Record<Device['id'], keyof DeviceStatus> = {
  'eng-ws01': 'clean',
  'eng-ws02': 'infected',
  'rd-ws01': 'clean',
  'rd-ws02': 'origin'
};

function App() {
  // State management
  const [userAnswers, setUserAnswers] = useState<Record<Device['id'], keyof DeviceStatus>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedLog, setSelectedLog] = useState<DeviceLog | null>(null);

  // Handle device classification selection
  const handleAnswerChange = (deviceId: Device['id'], status: keyof DeviceStatus) => {
    setUserAnswers(prev => ({
      ...prev,
      [deviceId]: status
    }));
  };

  // Handle showing device logs
  const showDeviceLogs = (deviceId: Device['id']) => {
    const log = mockLogs[deviceId];
    if (log) {
      setSelectedLog(log);
    }
  };

  // Calculate and show results
  const submitAnswers = () => {
    setShowResults(true);
  };

  // Calculate score
  const calculateScore = () => {
    const totalQuestions = Object.keys(mockCorrectAnswers).length;
    let correctCount = 0;

    Object.keys(mockCorrectAnswers).forEach(deviceId => {
      if (userAnswers[deviceId] === mockCorrectAnswers[deviceId]) {
        correctCount++;
      }
    })
    console.log('userAnswers:', userAnswers);

    return {
      correct: correctCount,
      total: totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100)
    };
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>🔒 Network Forensics Investigation</h1>
          <p>Incident Response Training Simulation</p>
        </header>

        {/* Scenario Information */}
        <section className="scenario">
          <h3>🚨 SECURITY INCIDENT ALERT</h3>
          <p><strong>Incident ID:</strong> INC-2025-0001</p>
          <p><strong>Severity:</strong> HIGH</p>
          <p><strong>Description:</strong> Our network monitoring systems have detected suspicious activity indicating a potential malware infection. Multiple workstations in our Engineering and R&D departments may be compromised.</p>
          <p><em>Click on workstations to view vulnerability scan results. Click the firewall to examine network traffic logs.</em></p>
        </section>

        {/* Network Diagram */}
        <section className="network-diagram">
          {/* Engineering Department */}
          <div className="org-group">
            <div className="org-title">Engineering Department</div>
            {mockDevices
              .filter(device => device.department === 'engineering')
              .map(device => (
                <div
                  key={device.id}
                  className={`workstation ${userAnswers[device.id] || ''}`}
                  onClick={() => showDeviceLogs(device.id)}
                >
                  <div className="ws-name">{device.name}</div>
                  <div className="ws-ip">{device.ip}</div>
                  <div className="checkboxes">
                    {(['clean', 'infected', 'origin'] as const).map(status => (
                      <div key={status} className="checkbox-group">
                        <input
                          type="radio"
                          id={`${device.id}-${status}`}
                          name={device.id}
                          value={status}
                          checked={userAnswers[device.id] === status}
                          onChange={() => handleAnswerChange(device.id, status)}
                        />
                        <label htmlFor={`${device.id}-${status}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Firewall */}
          <div className="firewall-section">
            <div className="firewall" onClick={() => showDeviceLogs('firewall')}>
              <div className="fw-title">🔥 FIREWALL</div>
              <div className="fw-name">FW-CORE-01</div>
              <div className="fw-hint">Click to view logs</div>
            </div>

            <div className="connection-line"></div>

            <div className="cloud">
              <div className="cloud-icon">☁️ CLOUD</div>
              <div className="cloud-name">CSP Services</div>
              <div className="cloud-hint">(Read-only)</div>
            </div>
          </div>

          {/* R&D Department */}
          <div className="org-group">
            <div className="org-title">R&D Department</div>
            {mockDevices
              .filter(device => device.department === 'rd')
              .map(device => (
                <div
                  key={device.id}
                  className={`workstation ${userAnswers[device.id] || ''}`}
                  onClick={() => showDeviceLogs(device.id)}
                >
                  <div className="ws-name">{device.name}</div>
                  <div className="ws-ip">{device.ip}</div>
                  <div className="checkboxes">
                    {(['clean', 'infected', 'origin'] as const).map(status => (
                      <div key={status} className="checkbox-group">
                        <input
                          type="radio"
                          id={`${device.id}-${status}`}
                          name={device.id}
                          value={status}
                          checked={userAnswers[device.id] === status}
                          onChange={() => handleAnswerChange(device.id, status)}
                        />
                        <label htmlFor={`${device.id}-${status}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Submit Button */}
        <button className="submit-btn" onClick={submitAnswers}>
          Submit Investigation Results
        </button>

        {/* Results */}
        {showResults && (
          <section className="results">
            <div className={`score ${calculateScore().percentage >= 75 ? 'correct' : 'incorrect'}`}>
              Score: {calculateScore().correct}/{calculateScore().total} ({calculateScore().percentage}%)
            </div>
            <h3>Investigation Results:</h3>
            <div className="results-details">
              {Object.keys(mockCorrectAnswers).map(deviceId => {
                const device = mockDevices.find(d => d.id === deviceId);
                const userAnswer = userAnswers[deviceId] || 'No Selection';
                const correctAnswer = mockCorrectAnswers[deviceId];
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
        )}

        {/* Modal for logs */}
        {selectedLog && (
          <div className="modal" onClick={() => setSelectedLog(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setSelectedLog(null)}>
                &times;
              </span>
              <h2>{selectedLog.title}</h2>
              <div className="terminal">
                <pre>{selectedLog.content}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;