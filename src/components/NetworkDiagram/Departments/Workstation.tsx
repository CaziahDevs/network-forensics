import React from 'react'
import type { Device, DeviceStatus } from '../../../types';

import './Workstation.css';
interface WorkstationProps {
    device: Device
    userAnswer?: keyof DeviceStatus;
    onAnswerChange: (deviceId: Device['id'], status: keyof DeviceStatus) => void;
    onShowLogs: (deviceId: Device['id']) => void;
}

const Workstation: React.FC<WorkstationProps> = ({device, userAnswer, onAnswerChange, onShowLogs}) => {
  return (
    <div className="workstation">
      <div className="ws-info" onClick={() => onShowLogs(device.id)}>
        <div className="ws-name">{device.name}</div>
        <div className="ws-ip">{device.ip}</div>
      </div>
      <div className="checkboxes">
        {(['clean', 'infected', 'origin'] as const).map(status => (
          <div key={status} className="checkbox-group">
            <input
              type="radio"
              id={`${device.id}-${status}`}
              name={device.id}
              value={status}
              checked={userAnswer === status}
              onChange={() => onAnswerChange(device.id, status)}
            />
            <label htmlFor={`${device.id}-${status}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Workstation