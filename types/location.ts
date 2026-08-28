export interface Location {
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country?: string;
}

export interface LatLon {
  lat: number;
  lon: number;
}
