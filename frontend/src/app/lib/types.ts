
export type Category = 'Heritage' | 'Nature' | 'Adventure' | 'Religious' | 'Culture';

export interface State {
  id: string;
  name: string;
  capital: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export interface City {
  id: string;
  stateId: string;
  name: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  stateId: string;
  cityName: string;
  category: Category;
  description: string;
  historicalSignificance: string;
  bestTime: string;
  locationLink: string;
  images: string[];
  imageHints: string[];
  nearbyAttractions: string[];
  uniqueInsights?: string[];
}
