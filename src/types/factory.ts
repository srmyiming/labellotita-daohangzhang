export interface Factory {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  catalog_url?: string;
  created_at: string;
  updated_at: string;
}

export interface FactoryFilters {
  search?: string;
  category?: string;
  region?: string;
  country?: string;
}

export interface FactoryWithRelations extends Factory {
  categories?: string[];
  regions?: string[];
  countries?: string[];
  tags?: string[];
} 