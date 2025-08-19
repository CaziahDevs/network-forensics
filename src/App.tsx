import React, { useState } from 'react';
import './App.css';

// Types
import type { Device, DeviceStatus, DeviceLog } from './types';
import Modal from './components/common/Modal/Modal';
import Network from './components/NetworkDiagram/Network/Network';
import Scenario from './components/ScenarioInfo/Scenario';
import Results from './components/Results/Results';
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

const App: React.FC = () => {
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
        <Scenario />

        {/* Network Diagram */}
        <Network
          devices={mockDevices}
          userAnswers={userAnswers}
          onAnswerChange={handleAnswerChange}
          onShowLogs={showDeviceLogs}
          submitAnswers={submitAnswers}
        />

        {/* Results */}
        {showResults && <Results calculateScore={calculateScore} correctAnswers={mockCorrectAnswers} userAnswers={userAnswers} devices={mockDevices} />}

        {/* Modal for logs */}
        {selectedLog && <Modal selectedLog={selectedLog} setSelectedLog={setSelectedLog} />}
      </div>
    </div>
  );
}

export default App;