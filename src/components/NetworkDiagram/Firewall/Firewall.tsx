import React from 'react'

import './Firewall.css';

interface FirewallProps {
    onShowLogs: (deviceId: string) => void;
}

const Firewall: React.FC<FirewallProps> = ({ onShowLogs }) => {
  return (
    <div className="firewall" onClick={() => onShowLogs('firewall')}>
      <div className="fw-title">🔥 FIREWALL</div>
      <div className="fw-name">FW-CORE-01</div>
      <div className="fw-hint">Click to view logs</div>
    </div>
  )
}

export default Firewall