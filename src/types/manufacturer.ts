import { Country } from './country';
import { Tag } from './tag';

export interface Manufacturer {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  catalog_url: string | null;
  country_id: string;
  created_at: string;
}

export interface ManufacturerWithRelations extends Manufacturer {
  country: Country;
  tags: Tag[];
  images: {
    id: string;
    url: string;
    created_at: string;
  }[];
}

export interface ManufacturerFilters {
  search?: string;
  countryId?: string;
  regionId?: string;
  tagIds?: string[];
  page?: number;
  perPage?: number;
} 