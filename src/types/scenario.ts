import type { Device, DeviceLog, DeviceStatus } from './device';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  devices: Device[];
  logs: Record<string, DeviceLog>;
  correctAnswers: Record<string, keyof DeviceStatus>;
}