import React from 'react'
import './Terminal.css';
import type { DeviceLog } from '../../types';

interface TerminalProps {
    selectedLog: DeviceLog;
}
const Terminal: React.FC<TerminalProps> = ({ selectedLog }) => {
    return (
        <>
            <h2 className='terminalTitle'> Device Log: {selectedLog.title}</h2>
            <div className="terminal">

                <pre className='terminalContent'>{selectedLog.content}</pre>
            </div>
        </>

    )
}

export default Terminal