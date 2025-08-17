export interface DeviceStatus {
  clean: boolean;
  infected: boolean;
  origin: boolean;
}

export interface Device {
  id: string;
  name: string;
  ip: string;
  department: string;
  status?: keyof DeviceStatus;
}

export interface DeviceLog {
  title: string;
  content: string;
  timestamp: string;
}