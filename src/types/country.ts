export interface Country {
  id: string;
  name: string;
  code: string;
  region_id: string;
  created_at: string;
}

export interface CountryWithCount extends Country {
  manufacturer_count: number;
} 