export interface Region {
  id: string;
  name: string;
  created_at: string;
}

export interface RegionWithCount extends Region {
  manufacturer_count: number;
  countries: {
    id: string;
    name: string;
    manufacturer_count: number;
  }[];
} 