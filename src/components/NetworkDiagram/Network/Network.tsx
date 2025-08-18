import React from 'react'
import Department from '../Departments/Department'
import JumpBox from '../JumpBox/JumpBox';
import './Network.css';
import type { Device, DeviceStatus } from '../../../types';
import Firewall from '../Firewall/Firewall';

interface NetworkProps {
    devices: Device[];
    userAnswers: Record<string, keyof DeviceStatus>;
    onAnswerChange: (deviceId: string, status: keyof DeviceStatus) => void;
    onShowLogs: (deviceId: string) => void;
    submitAnswers: () => void;
}
const Network: React.FC<NetworkProps> = ({ devices, userAnswers, onAnswerChange, onShowLogs, submitAnswers }) => {
    return (
        <section className="network-diagram">
            {/* Engineering Department */}
            <Department
                name="Engineering Department"
                devices={devices.filter(device => device.department === 'engineering')}
                userAnswers={userAnswers}
                onAnswerChange={onAnswerChange}
                onShowLogs={onShowLogs}
            />

            {/* Firewall */}
            <div className="connection-section">
                {/* Firewall */}
                <Firewall onShowLogs={onShowLogs} />

                {  /* Connection line */ }
                <div className="connection-line"></div>

                {/* Jump box */}
                <JumpBox onShowLogs={onShowLogs} />
            </div>

            <Department
                name="R&D Department"
                devices={devices.filter(device => device.department === 'rd')}
                userAnswers={userAnswers}
                onAnswerChange={onAnswerChange}
                onShowLogs={onShowLogs}
            />

            {/* Submit Button */}
            <button className="submit-btn" onClick={submitAnswers}>
                Submit Investigation Results
            </button>
        </section>
    )
}

export default Network