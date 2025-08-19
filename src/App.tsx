import React, { useState } from 'react';
import './App.css';

// Types
import type { Device, DeviceStatus, DeviceLog } from './types';
import Modal from './components/common/Modal/Modal';
import Network from './components/NetworkDiagram/Network/Network';
import Scenario from './components/ScenarioInfo/Scenario';
import Results from './components/Results/Results';
import { deviceLogs, correctAnswers } from './components/common/Answers';

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
    const log = deviceLogs[deviceId];
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
    const totalQuestions = Object.keys(correctAnswers).length;
    let correctCount = 0;

    Object.keys(correctAnswers).forEach(deviceId => {
      if (userAnswers[deviceId] === correctAnswers[deviceId]) {
        correctCount++;
      }
    })

    return {
      correct: correctCount,
      total: totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100)
    };
  };
   const devices: Device[] = [
    // Engineering Department
    {
      id: 'eng-ws-03',
      name: 'ENG-WS-03',
      ip: '192.168.10.15',
      department: 'engineering'
    },
    {
      id: 'eng-ws-07',
      name: 'ENG-WS-07',
      ip: '192.168.10.19',
      department: 'engineering'
    },
    {
      id: 'eng-ws-12',
      name: 'ENG-WS-12',
      ip: '192.168.10.23',
      department: 'engineering'
    },

    // R&D Department
    {
      id: 'rd-ws-05',
      name: 'RD-WS-05',
      ip: '192.168.20.8',
      department: 'rd'
    },
    {
      id: 'rd-ws-09',
      name: 'RD-WS-09',
      ip: '192.168.20.12',
      department: 'rd'
    }
  ];
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
          devices={devices}
          userAnswers={userAnswers}
          onAnswerChange={handleAnswerChange}
          onShowLogs={showDeviceLogs}
          submitAnswers={submitAnswers}
        />

        {/* Results */}
        {showResults && <Results calculateScore={calculateScore} correctAnswers={correctAnswers} userAnswers={userAnswers} devices={devices} />}

        {/* Modal for logs */}
        {selectedLog && <Modal selectedLog={selectedLog} setSelectedLog={setSelectedLog} />}
      </div>
    </div>
  );
}

export default App;