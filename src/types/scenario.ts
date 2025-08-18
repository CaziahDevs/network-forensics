import type { Device, DeviceLog, DeviceStatus } from './device';

interface Department {
  id: string;
  name: string;
  workstations: Device[];
  isCollapsed?: boolean; // For UI state
}


export interface Scenario {
  id: string;
  name: string;
  description: string;
  devices: Device[];
  logs: Record<string, DeviceLog>;
  correctAnswers: Record<string, keyof DeviceStatus>;
}