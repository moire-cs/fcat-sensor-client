export type Plot = {
  id: string;
  nodeID: string | null;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  alerts?: Array<String>;
};
