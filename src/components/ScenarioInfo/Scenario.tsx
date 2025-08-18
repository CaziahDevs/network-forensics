import React from 'react'
import './Scenario.css';

const Scenario = () => {
    return (
        <section className="scenario">
            <h3>🚨 SECURITY INCIDENT ALERT</h3>
            <p><strong>Incident ID:</strong> INC-2025-0001</p>
            <p><strong>Severity:</strong> HIGH</p>
            <p><strong>Description:</strong> Our network monitoring systems have detected suspicious activity indicating a potential malware infection. Multiple workstations in our Engineering and R&D departments may be compromised.</p>
            <p><em>Click on workstations to view vulnerability scan results. Click the firewall to examine network traffic logs.</em></p>
        </section>
    )
}

export default Scenario