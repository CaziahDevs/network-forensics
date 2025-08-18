import React from 'react'

import './Department.css';
import type { Device, DeviceStatus } from '../../../types';
import Workstation from './Workstation';
interface DepartmentProps {
    name: string;
    devices: Device[];
    userAnswers: Record<string, keyof DeviceStatus>;
    onAnswerChange: (deviceId: string, status: keyof DeviceStatus) => void;
    onShowLogs: (deviceId: string) => void;
}
const Department: React.FC<DepartmentProps> = ({ name, devices, userAnswers, onAnswerChange, onShowLogs }) => {

    return (
        <>
            <div className='org-group'>
                <div className="org-title">{name}</div>
                {devices.map(device => (
                    <Workstation
                        key={device.id}
                        device={device}
                        userAnswer={userAnswers[device.id]}
                        onAnswerChange={onAnswerChange}
                        onShowLogs={onShowLogs}
                    />
                ))}
            </div>
        </>


    )
}

export default Department