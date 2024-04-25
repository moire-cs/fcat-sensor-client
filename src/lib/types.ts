export type Plot = {
  id: string;
  nodeID: string | null;
  latitude: number;
  longitude: number;
  description: string;
};

export type LastMeasurementsObject = {
  nodes: Array<{ lastMeasurements: Array<Measurement>; node: SensorNode }>;
  sensors: Array<Sensor>;
  plots: Array<Plot>;
};

export interface MessageEntry {
  id: string;
  nodeID: string;
  plotID: string;
  time: Date;
  type: 'MESSAGE' | 'MEASUREMENT';
  data: string;
  sk: string | null;
  sensorID: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message extends MessageEntry {
  type: 'MESSAGE';
  sk: null;
  sensorID: null;
}

export interface Measurement extends MessageEntry {
  type: 'MEASUREMENT';
  sk: string;
  sensorID: string;
}

export type SensorNode = {
  id: string;
  plotID: string | null;
  lastSeen: Date | null;
};

export type Sensor = {
  id: number;
  name: string;
  description: string;
  length: number;
  transformEq: string;
  typicalRange: [number, number];
};
