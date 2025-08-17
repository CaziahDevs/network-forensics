import React from 'react'
import './Modal.css';
import type { DeviceLog } from '../../../types/device';
import Terminal from '../../Terminal/Terminal';
interface ModalProps {
    selectedLog: DeviceLog | null;
    setSelectedLog: (log: DeviceLog | null) => void;
}

const Modal: React.FC<ModalProps> = ({ selectedLog, setSelectedLog }) => {
    return (
        <div className="modal" onClick={() => setSelectedLog(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={() => setSelectedLog(null)}>
                    &times;
                </span>
                {selectedLog && (<Terminal selectedLog={selectedLog} />)}
            </div>
        </div>
    )
}

export default Modal