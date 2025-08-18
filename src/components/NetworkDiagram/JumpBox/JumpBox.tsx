import React from 'react'
import './JumpBox.css';
interface JumpBoxProps {
    onShowLogs: (deviceId: string) => void;
}

const JumpBox: React.FC<JumpBoxProps> = ({ onShowLogs }) => {
  return (
    <div className="jump-box" onClick={() => onShowLogs('jump-box')}>
      <div className="jb-title">📦 JUMP BOX</div>
      <div className="jb-name">JB-CORE-01</div>
      <div className="jb-hint">Click to view logs</div>
    </div>
  )
}

export default JumpBox