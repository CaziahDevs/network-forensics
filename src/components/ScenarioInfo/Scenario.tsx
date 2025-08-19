import React, { useState } from 'react'
import './Scenario.css';

const Scenario: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <section className="scenario">
                <h3>🚨 SECURITY INCIDENT ALERT</h3>
                <p><strong>Incident ID:</strong> INC-2025-0819</p>
                <p><strong>Severity:</strong> HIGH</p>
                <p><strong>Time:</strong> 14:23 EST</p>
                <p><strong>Description:</strong> Suspicious network activity detected following reports of phishing emails. Multiple workstations showing anomalous behavior across Engineering and R&D departments.</p>
                <button 
                    className="scenario-details-btn" 
                    onClick={() => setShowModal(true)}
                >
                    📋 View Full Incident Report
                </button>
                <p><em>Click workstations, jump box, and firewall to analyze evidence. Determine the attack path and classify each device.</em></p>
            </section>

            {showModal && (
                <div className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content incident-report" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        
                        <h2>📋 INCIDENT RESPONSE REPORT</h2>
                        
                        <div className="report-section">
                            <h3>Timeline of Events</h3>
                            <div className="timeline">
                                <div className="timeline-item">
                                    <strong>12:47 EST</strong> - Email security gateway flagged suspicious message to Engineering team
                                </div>
                                <div className="timeline-item">
                                    <strong>13:15 EST</strong> - Employee reports clicking link in "IT Security Update" email
                                </div>
                                <div className="timeline-item">
                                    <strong>13:22 EST</strong> - Firewall detects unusual outbound connections from Engineering subnet
                                </div>
                                <div className="timeline-item">
                                    <strong>13:45 EST</strong> - Jump box shows failed authentication attempts, then successful login
                                </div>
                                <div className="timeline-item">
                                    <strong>14:03 EST</strong> - Lateral movement detected toward R&D network segment
                                </div>
                                <div className="timeline-item">
                                    <strong>14:23 EST</strong> - SOC analyst escalates to incident response team
                                </div>
                            </div>
                        </div>

                        <div className="report-section">
                            <h3>Initial Assessment</h3>
                            <p><strong>Attack Vector:</strong> Spear phishing email with credential harvesting payload</p>
                            <p><strong>Potential Impact:</strong> Unauthorized access to proprietary R&D data</p>
                            <p><strong>Affected Systems:</strong> Engineering workstations, jump box infrastructure, R&D network segment</p>
                        </div>

                        <div className="report-section">
                            <h3>Your Mission</h3>
                            <p>Analyze the network forensics data to:</p>
                            <ul>
                                <li>Identify the <strong>origin point</strong> of the attack</li>
                                <li>Determine which systems are <strong>infected</strong> with malware</li>
                                <li>Verify which systems remain <strong>clean</strong></li>
                                <li>Trace the attack path through your infrastructure</li>
                            </ul>
                        </div>

                        <div className="report-section">
                            <h3>Available Evidence</h3>
                            <ul>
                                <li>Workstation vulnerability scans and system logs</li>
                                <li>Jump box authentication and process logs</li>
                                <li>Firewall traffic analysis and connection logs</li>
                                <li>Network flow data and DNS queries</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Scenario